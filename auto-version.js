#!/usr/bin/env node

/**
 * Automatic Versioning System for Raten OIDA
 * Semantic Versioning: v2.x.y.z
 * - x: Major (breaking changes)
 * - y: Minor (new features)
 * - z: Patch (bug fixes)
 */

const fs = require('fs');
const { execSync } = require('child_process');

class AutoVersion {
    constructor() {
        this.versionFile = './version.json';
        this.filesToUpdate = [
            './version.json',
            './js/views/dev.js', // Footer version
            './README.md', // Version badges
            './index.html' // Meta tags if needed
        ];
    }

    // Get current version from version.json
    getCurrentVersion() {
        try {
            const data = JSON.parse(fs.readFileSync(this.versionFile, 'utf8'));
            return data.version;
        } catch (error) {
            console.error('❌ Error reading version file:', error.message);
            return '2.0.0.0';
        }
    }

    // Analyze git changes to determine version bump type
    analyzeChanges() {
        try {
            // Get changed files
            const changedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
                .trim()
                .split('\n')
                .filter(file => file.length > 0);

            // Get commit message
            const commitMsg = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim().toLowerCase();

            console.log('📊 Analyzing changes...');
            console.log('Changed files:', changedFiles.length);
            console.log('Commit message:', commitMsg);

            // Determine version bump type
            let bumpType = 'patch'; // Default

            // Major version bumps (breaking changes)
            if (commitMsg.includes('breaking') ||
                commitMsg.includes('major') ||
                changedFiles.some(file => file.includes('breaking'))) {
                bumpType = 'major';
            }
            // Minor version bumps (new features)
            else if (commitMsg.includes('feature') ||
                     commitMsg.includes('feat') ||
                     commitMsg.includes('add') ||
                     commitMsg.includes('new') ||
                     changedFiles.some(file => file.includes('feature') || file.includes('new'))) {
                bumpType = 'minor';
            }
            // Patch version bumps (bug fixes, improvements)
            else if (commitMsg.includes('fix') ||
                     commitMsg.includes('bug') ||
                     commitMsg.includes('improve') ||
                     commitMsg.includes('refactor') ||
                     commitMsg.includes('style') ||
                     commitMsg.includes('docs')) {
                bumpType = 'patch';
            }

            console.log('🎯 Determined version bump:', bumpType);
            return bumpType;

        } catch (error) {
            console.log('⚠️ Could not analyze changes, defaulting to patch');
            return 'patch';
        }
    }

    // Increment version number
    incrementVersion(currentVersion, bumpType) {
        const parts = currentVersion.split('.').map(Number);
        // Ensure we have 4 parts: v2.x.y.z
        while (parts.length < 4) {
            parts.push(0);
        }

        switch (bumpType) {
            case 'major':
                parts[1]++; // x
                parts[2] = 0; // y
                parts[3] = 0; // z
                break;
            case 'minor':
                parts[2]++; // y
                parts[3] = 0; // z
                break;
            case 'patch':
            default:
                parts[3]++; // z
                break;
        }

        return parts.join('.');
    }

    // Update version in all relevant files
    updateFiles(newVersion) {
        console.log('📝 Updating version in files...');

        // Update version.json
        try {
            const versionData = JSON.parse(fs.readFileSync(this.versionFile, 'utf8'));
            versionData.version = newVersion;
            versionData.buildDate = new Date().toISOString();
            fs.writeFileSync(this.versionFile, JSON.stringify(versionData, null, 2));
            console.log('✅ Updated version.json');
        } catch (error) {
            console.error('❌ Error updating version.json:', error.message);
        }

        // Update dev.js footer
        try {
            let devJs = fs.readFileSync('./js/views/dev.js', 'utf8');
            devJs = devJs.replace(/const version = ['"`][^'"`]*['"`];/, `const version = '${newVersion}';`);
            fs.writeFileSync('./js/views/dev.js', devJs);
            console.log('✅ Updated dev.js');
        } catch (error) {
            console.error('❌ Error updating dev.js:', error.message);
        }

        // Update README.md if it contains version badges
        try {
            let readme = fs.readFileSync('./README.md', 'utf8');
            // Update version badges/shields if they exist
            readme = readme.replace(/v\d+\.\d+\.\d+\.\d+/g, `v${newVersion}`);
            fs.writeFileSync('./README.md', readme);
            console.log('✅ Updated README.md');
        } catch (error) {
            console.log('⚠️ README.md not found or no version badges to update');
        }
    }

    // Main versioning function
    run() {
        console.log('🚀 Starting automatic versioning...');

        const currentVersion = this.getCurrentVersion();
        console.log('📋 Current version:', currentVersion);

        const bumpType = this.analyzeChanges();
        const newVersion = this.incrementVersion(currentVersion, bumpType);

        console.log('⬆️ New version:', newVersion);

        this.updateFiles(newVersion);

        console.log('🎉 Version updated successfully!');
        console.log('📦 Ready to commit and push...');

        return newVersion;
    }
}

// CLI interface
if (require.main === module) {
    const autoVersion = new AutoVersion();

    // Check if run with --help
    if (process.argv.includes('--help') || process.argv.includes('-h')) {
        console.log(`
🤖 Raten OIDA Auto-Versioning System

Usage: node auto-version.js [options]

Options:
  --help, -h    Show this help
  --dry-run     Show what would be changed without making changes
  --force       Force version bump regardless of changes

Examples:
  node auto-version.js                    # Normal versioning
  node auto-version.js --dry-run         # Preview changes
  node auto-version.js --force            # Force bump

Version format: v2.x.y.z
- x: Major (breaking changes)
- y: Minor (new features)
- z: Patch (bug fixes, improvements)
        `);
        process.exit(0);
    }

    // Dry run mode
    if (process.argv.includes('--dry-run')) {
        console.log('🔍 Dry run mode - no changes will be made');
        const currentVersion = autoVersion.getCurrentVersion();
        const bumpType = autoVersion.analyzeChanges();
        const newVersion = autoVersion.incrementVersion(currentVersion, bumpType);
        console.log('Current:', currentVersion);
        console.log('Bump type:', bumpType);
        console.log('New version:', newVersion);
        process.exit(0);
    }

    // Force mode
    if (process.argv.includes('--force')) {
        console.log('⚡ Force mode - bumping patch version');
        const currentVersion = autoVersion.getCurrentVersion();
        const newVersion = autoVersion.incrementVersion(currentVersion, 'patch');
        autoVersion.updateFiles(newVersion);
        console.log('Forced version bump to:', newVersion);
        process.exit(0);
    }

    // Normal run
    try {
        const newVersion = autoVersion.run();
        console.log(`\n🎊 Version successfully updated to v${newVersion}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Versioning failed:', error.message);
        process.exit(1);
    }
}

module.exports = AutoVersion;
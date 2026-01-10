#!/usr/bin/env python3
"""
HTTP Server mit Cache-Control Headers für Development
"""
import http.server
import socketserver
import os
from datetime import datetime

PORT = 8001

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Cache-Control für HTML: Nie cachen
        if self.path.endswith('.html') or self.path == '/':
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        # Cache-Control für Assets: 1 Stunde (mit Revalidation)
        elif self.path.endswith(('.js', '.css', '.png', '.jpg', '.svg', '.woff', '.woff2')):
            self.send_header('Cache-Control', 'public, max-age=3600, must-revalidate')
        # Default: Keine Caching-Direktive
        else:
            self.send_header('Cache-Control', 'no-cache')
        
        super().end_headers()

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

if __name__ == '__main__':
    os.chdir('/workspaces/Raten_oida')
    
    with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"🚀 Server läuft auf http://localhost:{PORT}")
        print(f"   Cache-Control für .html: no-store (immer neu laden)")
        print(f"   Cache-Control für .js/.css: 1 Stunde mit Revalidation")
        print(f"   Drücke Ctrl+C zum Beenden\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✅ Server beendet")

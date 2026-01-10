#!/usr/bin/env python3
"""
Simple HTTP server with cache control headers
"""

import http.server
import socketserver
import os

PORT = 8001

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # AGGRESSIVE Cache-Control für ALLE Dateien
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Clear-Site-Data', '"cache", "storage"')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom log format
        print(f"[{self.log_date_time_string()}] {format % args}")

if __name__ == '__main__':
    os.chdir('/workspaces/Raten_oida')
    
    with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"✅ Server läuft auf http://localhost:{PORT}")
        print(f"📂 Serving directory: {os.getcwd()}")
        print("🔄 Cache-Control: Deaktiviert")
        print("\nDrücke CTRL+C zum Beenden\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server beendet")
            httpd.shutdown()

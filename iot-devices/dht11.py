import argparse
import requests
import sys
import random

def send_post_request(base_url, endpoint, token, payload):
    url = f"{base_url.rstrip('/')}{endpoint}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        print(f"[{response.status_code}] POST to {url}")
        print(f"Response: {response.text}\n")
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error sending request to {url}: {e}", file=sys.stderr)

def main():
    parser = argparse.ArgumentParser(description="Send temperature and humidity POST requests with a Bearer Token.")
    parser.add_argument("--token", required=True, help="Bearer Token for authentication")
    parser.add_argument("--url", default="https://api.example.com", help="Base URL of the server (default: https://api.example.com)")
    
    args = parser.parse_args()

    # Sample data to send (modify values as needed)
    temp_payload = {"value": random.uniform(25, 40), "unit": "C"}
    humidity_payload = {"value": random.uniform(30, 70)}

    print("--- Sending Temperature Data ---")
    send_post_request(args.url, "/api/v1/temp", args.token, temp_payload)

    print("--- Sending Humidity Data ---")
    send_post_request(args.url, "/api/v1/humidity", args.token, humidity_payload)

if __name__ == "__main__":
    main()
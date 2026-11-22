import os, re, urllib.request
from urllib.parse import urljoin

os.makedirs("img", exist_ok=True)
pages = [
    "https://wortool.com/maps",
    "https://wortool.com/maps?page=2",
    "https://wortool.com/maps?page=3"
]

def slugify(name):
    return re.sub(r"[^a-z0-9_]+", "", name.lower().replace("'", "").replace("&", "and").replace(" ", "_"))

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
downloaded = 0

for url in pages:
    print(f"Fetching {url} ...")
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req, timeout=15).read().decode("utf-8", errors="ignore")
    # Match image tags with alt or nearby map titles
    for img_url, alt in re.findall(r'<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']', html, re.I):
        if not alt.strip() or "logo" in img_url.lower() or "icon" in img_url.lower():
            continue
        full_img_url = urljoin(url, img_url)
        ext = os.path.splitext(full_img_url.split("?")[0])[1] or ".jpg"
        fname = os.path.join("img", f"{slugify(alt)}{ext}")
        try:
            img_req = urllib.request.Request(full_img_url, headers=headers)
            data = urllib.request.urlopen(img_req, timeout=15).read()
            with open(fname, "wb") as f:
                f.write(data)
            downloaded += 1
            print(f"  Saved: {fname}")
        except Exception as e:
            print(f"  Failed {full_img_url}: {e}")

print(f"Done! Downloaded {downloaded} map images into ./img/")

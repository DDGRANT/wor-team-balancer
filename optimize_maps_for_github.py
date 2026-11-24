import os, re, json
from PIL import Image

# 1. PDF 47 张 Skirmish 精确士气票数与 Final Push 数据
PDF_MORALE_STATS = {
    "alexander-farm": {"final_push": "4:04", "usa_tickets": 159, "csa_tickets": 117, "total_tickets": 276, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "35.90%", "contrast_usa": "-26.42%"},
    "crossroads": {"final_push": "3:34", "usa_tickets": 145, "csa_tickets": 106, "total_tickets": 251, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "36.79%", "contrast_usa": "-26.90%"},
    "smith-field": {"final_push": "4:04", "usa_tickets": 137, "csa_tickets": 106, "total_tickets": 243, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "29.25%", "contrast_usa": "-22.63%"},
    "crecy-s-cornfield": {"final_push": "4:04", "usa_tickets": 120, "csa_tickets": 100, "total_tickets": 220, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "20.00%", "contrast_usa": "-16.67%"},
    "larsen-homestead": {"final_push": "4:04", "usa_tickets": 125, "csa_tickets": 104, "total_tickets": 229, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "20.19%", "contrast_usa": "-16.80%"},
    "south-woodlot": {"final_push": "3:34", "usa_tickets": 153, "csa_tickets": 127, "total_tickets": 280, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "20.47%", "contrast_usa": "-16.99%"},
    "flemming-s-meadow": {"final_push": "4:04", "usa_tickets": 154, "csa_tickets": 102, "total_tickets": 256, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "50.98%", "contrast_usa": "-33.77%"},
    "wagon-road": {"final_push": "4:04", "usa_tickets": 171, "csa_tickets": 120, "total_tickets": 291, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "42.50%", "contrast_usa": "-29.82%"},
    "crossley-creek": {"final_push": "4:04", "usa_tickets": 162, "csa_tickets": 103, "total_tickets": 265, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "57.28%", "contrast_usa": "-36.42%"},
    "union-camp": {"final_push": "3:34", "usa_tickets": 156, "csa_tickets": 125, "total_tickets": 281, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "24.80%", "contrast_usa": "-19.87%"},
    "pat-s-turnpike": {"final_push": "3:44", "usa_tickets": 157, "csa_tickets": 129, "total_tickets": 286, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "21.71%", "contrast_usa": "-17.83%"},
    "stefan-s-lot": {"final_push": "3:54", "usa_tickets": 131, "csa_tickets": 137, "total_tickets": 268, "favored_side": "CSA", "favored_role": "Attacker", "contrast_csa": "-4.38%", "contrast_usa": "4.58%"},
    "confederate-encampment": {"final_push": "4:04", "usa_tickets": 156, "csa_tickets": 107, "total_tickets": 263, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "45.79%", "contrast_usa": "-31.41%"},
    "east-woods-skirmish": {"final_push": "3:14", "usa_tickets": 143, "csa_tickets": 115, "total_tickets": 258, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "24.35%", "contrast_usa": "-19.58%"},
    "hooker-s-push": {"final_push": "6:10", "usa_tickets": 122, "csa_tickets": 122, "total_tickets": 244, "favored_side": "Even", "favored_role": "Even", "contrast_csa": "0.00%", "contrast_usa": "0.00%"},
    "hagerstown-turnpike": {"final_push": "1:50", "usa_tickets": 130, "csa_tickets": 110, "total_tickets": 240, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "18.18%", "contrast_usa": "-15.38%"},
    "miller-s-cornfield": {"final_push": "2:02", "usa_tickets": 134, "csa_tickets": 122, "total_tickets": 256, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "9.84%", "contrast_usa": "-8.96%"},
    "east-woods": {"final_push": "3:18", "usa_tickets": 130, "csa_tickets": 124, "total_tickets": 254, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "4.84%", "contrast_usa": "-4.62%"},
    "nicodemus-hill": {"final_push": "2:26", "usa_tickets": 174, "csa_tickets": 89, "total_tickets": 263, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "95.51%", "contrast_usa": "-48.85%"},
    "bloody-lane": {"final_push": "3:06", "usa_tickets": 146, "csa_tickets": 100, "total_tickets": 246, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "46.00%", "contrast_usa": "-31.51%"},
    "pry-ford": {"final_push": "2:58", "usa_tickets": 124, "csa_tickets": 84, "total_tickets": 208, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "47.62%", "contrast_usa": "-32.26%"},
    "pry-grist-mill": {"final_push": "2:44", "usa_tickets": 150, "csa_tickets": 106, "total_tickets": 256, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "41.51%", "contrast_usa": "-29.33%"},
    "pry-house": {"final_push": "2:04", "usa_tickets": 115, "csa_tickets": 125, "total_tickets": 240, "favored_side": "CSA", "favored_role": "Attacker", "contrast_csa": "-8.00%", "contrast_usa": "8.70%"},
    "west-woods": {"final_push": "2:12", "usa_tickets": 137, "csa_tickets": 101, "total_tickets": 238, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "35.64%", "contrast_usa": "-26.28%"},
    "dunker-church": {"final_push": "3:44", "usa_tickets": 137, "csa_tickets": 103, "total_tickets": 240, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "33.01%", "contrast_usa": "-24.82%"},
    "burnside-bridge": {"final_push": "4:24", "usa_tickets": 137, "csa_tickets": 93, "total_tickets": 230, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "47.31%", "contrast_usa": "-32.12%"},
    "cooke-s-countercharge": {"final_push": "2:48", "usa_tickets": 143, "csa_tickets": 122, "total_tickets": 265, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "17.21%", "contrast_usa": "-14.69%"},
    "otto-sherrick-farm": {"final_push": "2:16", "usa_tickets": 159, "csa_tickets": 92, "total_tickets": 251, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "72.83%", "contrast_usa": "-42.14%"},
    "roulette-lane": {"final_push": "2:26", "usa_tickets": 127, "csa_tickets": 135, "total_tickets": 262, "favored_side": "CSA", "favored_role": "Attacker", "contrast_csa": "-5.93%", "contrast_usa": "6.30%"},
    "piper-farm": {"final_push": "2:12", "usa_tickets": 124, "csa_tickets": 100, "total_tickets": 224, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "24.00%", "contrast_usa": "-19.35%"},
    "hill-s-counterattack": {"final_push": "2:38", "usa_tickets": 135, "csa_tickets": 121, "total_tickets": 256, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "11.57%", "contrast_usa": "-10.37%"},
    "garland-s-stand": {"final_push": "4:06", "usa_tickets": 152, "csa_tickets": 120, "total_tickets": 272, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "26.67%", "contrast_usa": "-21.05%"},
    "cox-s-push": {"final_push": "3:10", "usa_tickets": 163, "csa_tickets": 102, "total_tickets": 265, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "59.80%", "contrast_usa": "-37.42%"},
    "hatch-s-attack": {"final_push": "3:28", "usa_tickets": 134, "csa_tickets": 115, "total_tickets": 249, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "16.52%", "contrast_usa": "-14.18%"},
    "anderson-s-counterattack": {"final_push": "3:20", "usa_tickets": 151, "csa_tickets": 110, "total_tickets": 261, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "37.27%", "contrast_usa": "-27.15%"},
    "reno-s-fall": {"final_push": "3:41", "usa_tickets": 138, "csa_tickets": 102, "total_tickets": 240, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "35.29%", "contrast_usa": "-26.09%"},
    "colquitt-s-defence": {"final_push": "4:02", "usa_tickets": 168, "csa_tickets": 117, "total_tickets": 285, "favored_side": "USA", "favored_role": "Attacker", "contrast_csa": "43.59%", "contrast_usa": "-30.36%"},
    "maryland-heights": {"final_push": "2:34", "usa_tickets": 155, "csa_tickets": 149, "total_tickets": 304, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "4.03%", "contrast_usa": "-3.87%"},
    "river-crossing": {"final_push": "4:22", "usa_tickets": 111, "csa_tickets": 159, "total_tickets": 270, "favored_side": "CSA", "favored_role": "Attacker", "contrast_csa": "-30.19%", "contrast_usa": "43.24%"},
    "downtown": {"final_push": "2:12", "usa_tickets": 135, "csa_tickets": 124, "total_tickets": 259, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "8.87%", "contrast_usa": "-8.15%"},
    "school-house-ridge": {"final_push": "1:30", "usa_tickets": 157, "csa_tickets": 150, "total_tickets": 307, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "4.67%", "contrast_usa": "-4.46%"},
    "high-street": {"final_push": "1:52", "usa_tickets": 147, "csa_tickets": 114, "total_tickets": 261, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "28.95%", "contrast_usa": "-22.45%"},
    "bolivar-heights-camp": {"final_push": "3:28", "usa_tickets": 145, "csa_tickets": 120, "total_tickets": 265, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "20.83%", "contrast_usa": "-17.24%"},
    "shenandoah-street": {"final_push": "1:14", "usa_tickets": 145, "csa_tickets": 122, "total_tickets": 267, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "18.85%", "contrast_usa": "-15.86%"},
    "harpers-graveyard": {"final_push": "1:44", "usa_tickets": 124, "csa_tickets": 88, "total_tickets": 212, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "40.91%", "contrast_usa": "-29.03%"},
    "bolivar-heights-redoubt": {"final_push": "3:24", "usa_tickets": 142, "csa_tickets": 134, "total_tickets": 276, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "5.97%", "contrast_usa": "-5.63%"},
    "washington-street": {"final_push": "1:56", "usa_tickets": 140, "csa_tickets": 123, "total_tickets": 263, "favored_side": "USA", "favored_role": "Defender", "contrast_csa": "13.82%", "contrast_usa": "-12.14%"}
}

def main():
    if not os.path.exists("maps.json"):
        print("错误：请在包含 maps.json 和 maps/ 文件夹的目录中运行此脚本！")
        return

    with open("maps.json", "r", encoding="utf-8") as f:
        root = json.load(f)

    os.makedirs("maps_web", exist_ok=True)
    raw_size = 0
    web_size = 0
    converted = 0

    for m in root.get("maps", []):
        slug = m.get("slug", "")
        # 注入 PDF 士气数据
        if slug in PDF_MORALE_STATS:
            m["morale"] = PDF_MORALE_STATS[slug]
        else:
            m["morale"] = {
                "final_push": "-",
                "usa_tickets": None,
                "csa_tickets": None,
                "total_tickets": None,
                "favored_side": "-",
                "favored_role": "-",
                "contrast_csa": "-",
                "contrast_usa": "-"
            }

        # 批量压缩转换 maps/*.png -> maps_web/*.webp (1200x1200, quality=82)
        for img_info in m.get("images", []):
            src_path = img_info.get("file", "")  # e.g. "maps/alexander-farm-map.png"
            if src_path and os.path.exists(src_path):
                raw_size += os.path.getsize(src_path)
                base_name = os.path.splitext(os.path.basename(src_path))[0] + ".webp"
                dst_path = os.path.join("maps_web", base_name)
                with Image.open(src_path) as im:
                    im = im.convert("RGB")
                    im.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
                    im.save(dst_path, "WEBP", quality=82, method=6)
                web_size += os.path.getsize(dst_path)
                img_info["web_file"] = f"maps_web/{base_name}"
                converted += 1

    with open("maps_merged.json", "w", encoding="utf-8") as f:
        json.dump(root, f, ensure_ascii=False, indent=2)

    print(f"处理完成！共合并 {len(root.get('maps', []))} 张地图，压缩转换 {converted} 张图片。")
    if raw_size > 0:
        print(f"体积对比：原始 {raw_size/1024/1024:.1f} MB -> WebP 网页版 {web_size/1024/1024:.1f} MB (体积减少 {(1 - web_size/raw_size)*100:.1f}%)")
    print("请将 maps_merged.json 和 maps_web/ 文件夹上传至 GitHub 仓库根目录！")

if __name__ == "__main__":
    main()

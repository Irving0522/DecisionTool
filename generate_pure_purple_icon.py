import os
from PIL import Image, ImageDraw, ImageFont

def draw_icon(size, filename):
    # 背景為全紫色
    img = Image.new("RGB", (size, size), "#8b5cf6")
    draw = ImageDraw.Draw(img)
    
    # 畫出淡紫色的圓圈邊框
    r = size * 0.45
    cx = size // 2
    cy = size // 2
    line_width = max(1, int(size * 0.05))
    draw.ellipse(
        (cx - r, cy - r, cx + r, cy + r), 
        fill="#8b5cf6", 
        outline="#c4b5fd", 
        width=line_width
    )
    
    # 嘗試載入微軟正黑體，否則用預設
    font_size = int(size * 0.5)
    try:
        font = ImageFont.truetype("msjh.ttc", font_size)
    except IOError:
        try:
            # 備用字體 (Windows)
            font = ImageFont.truetype("msgothic.ttc", font_size)
        except IOError:
            font = ImageFont.load_default()
            
    text = "決"
    
    # 置中計算
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    w = right - left
    h = bottom - top
    
    # 畫上白色的字
    # Y 軸稍微扣除一點點以視覺置中
    draw.text((cx - w/2, cy - h/2 - size * 0.08), text, fill="#ffffff", font=font)
    
    img.save(filename)
    print(f"Generated {filename}")

if __name__ == '__main__':
    target_dir = r"c:\Users\ruiting\Desktop\tool"
    draw_icon(512, os.path.join(target_dir, "icon-512.png"))
    draw_icon(192, os.path.join(target_dir, "icon-192.png"))

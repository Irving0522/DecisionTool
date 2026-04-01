import os
from PIL import Image
from rembg import remove
from io import BytesIO

def process():
    try:
        # File paths
        icon_path = r"C:\Users\ruiting\.gemini\antigravity\brain\258b2f85-7d95-498a-a1ff-d52b62fbf36a\app_icon_1775011293853.png"
        target_dir = r"c:\Users\ruiting\Desktop\tool"
        
        print("重新讀取並去背原始 3D 硬幣圖示...")
        with open(icon_path, 'rb') as i:
            input_img = i.read()
        output_img = remove(input_img)
        
        # Load transparent coin
        coin_img = Image.open(BytesIO(output_img)).convert("RGBA")
        
        # Resize coin to fit exactly inside the Android Safe Zone (75%)
        safe_size = int(512 * 0.75)
        coin_img = coin_img.resize((safe_size, safe_size), Image.Resampling.LANCZOS)
        
        # Create a beautiful vertical purple gradient (Match app header: #c4b5fd -> #7c3aed)
        print("生成漂亮的紫色漸層完美填滿背景...")
        gradient = Image.new("RGB", (1, 512))
        start_color = (196, 181, 253) # #c4b5fd
        end_color = (124, 58, 237)    # #7c3aed
        
        for y in range(512):
            r = int(start_color[0] + (end_color[0] - start_color[0]) * y / 512)
            g = int(start_color[1] + (end_color[1] - start_color[1]) * y / 512)
            b = int(start_color[2] + (end_color[2] - start_color[2]) * y / 512)
            gradient.putpixel((0, y), (r, g, b))
            
        # Stretch gradient to 512x512
        bg_512 = gradient.resize((512, 512))
        bg_512 = bg_512.convert("RGBA")
        
        # Paste transparent coin perfectly centered
        print("將去背硬幣置入最高質感的紫色漸層中...")
        x_offset = (512 - safe_size) // 2
        bg_512.paste(coin_img, (x_offset, x_offset), coin_img)
        
        # Save exact full-bleed outputs
        final_512 = bg_512.convert("RGB")
        final_512.save(os.path.join(target_dir, "icon-512.png"))
        
        final_192 = final_512.resize((192, 192), Image.Resampling.LANCZOS)
        final_192.save(os.path.join(target_dir, "icon-192.png"))
        
        print("成功！這張圖保證在 Android 滿版紫色，絕對沒有討厭的黑底或雙重底色！")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    process()

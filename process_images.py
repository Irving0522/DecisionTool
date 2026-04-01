import os
from PIL import Image

def process():
    try:
        # File paths
        icon_path = r"C:\Users\ruiting\.gemini\antigravity\brain\258b2f85-7d95-498a-a1ff-d52b62fbf36a\app_icon_1775011293853.png"
        screenshot_path = r"C:\Users\ruiting\.gemini\antigravity\brain\258b2f85-7d95-498a-a1ff-d52b62fbf36a\app_screenshot_1775011309156.png"
        
        target_dir = r"c:\Users\ruiting\Desktop\tool"
        
        # Process Icons
        with Image.open(icon_path) as img:
            rgb_img = img.convert("RGB")
            # 192x192
            img_192 = rgb_img.resize((192, 192), Image.Resampling.LANCZOS)
            img_192.save(os.path.join(target_dir, "icon-192.png"))
            
            # 512x512
            img_512 = rgb_img.resize((512, 512), Image.Resampling.LANCZOS)
            img_512.save(os.path.join(target_dir, "icon-512.png"))
            
        # Process Screenshot
        with Image.open(screenshot_path) as img:
            rgb_img = img.convert("RGB")
            # Usually screenshots need to be a standard size and ratio, e.g. 1080x1920 (portrait)
            # The generated image is likely 1024x1024. We will resize/crop it to 1080x1920 (fill background).
            bg = Image.new("RGB", (1080, 1920), (15, 23, 42)) # Match app background color #0f172a
            # Resize image to fit width (1080)
            ratio = 1080 / img.width
            new_height = int(img.height * ratio)
            resized = rgb_img.resize((1080, new_height), Image.Resampling.LANCZOS)
            
            # Paste into center
            y_offset = (1920 - new_height) // 2
            bg.paste(resized, (0, y_offset))
            bg.save(os.path.join(target_dir, "screenshot-1.png"))
            
        print("Images processed successfully.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    process()

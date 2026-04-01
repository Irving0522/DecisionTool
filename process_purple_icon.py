import os
from PIL import Image

def process():
    try:
        # File paths
        icon_path = r"C:\Users\ruiting\.gemini\antigravity\brain\258b2f85-7d95-498a-a1ff-d52b62fbf36a\app_icon_purple_1775014817019.png"
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
            
        print("Images processed successfully.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    process()

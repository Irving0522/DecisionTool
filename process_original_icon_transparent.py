import os
from PIL import Image
from rembg import remove

def process():
    try:
        # File paths - pointing to the ORIGINAL 3D silver coin icon generated earlier
        icon_path = r"C:\Users\ruiting\.gemini\antigravity\brain\258b2f85-7d95-498a-a1ff-d52b62fbf36a\app_icon_1775011293853.png"
        target_dir = r"c:\Users\ruiting\Desktop\tool"
        
        # Open source image and remove background
        with open(icon_path, 'rb') as i:
            input_img = i.read()
            
        print("Removing background from the original 3D coin icon...")
        output_img = remove(input_img)
        
        # Use PIL to resize the transparent image
        from io import BytesIO
        img = Image.open(BytesIO(output_img))
        img = img.convert("RGBA")
        
        # 192x192
        img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
        img_192.save(os.path.join(target_dir, "icon-192.png"))
        
        # 512x512
        img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
        img_512.save(os.path.join(target_dir, "icon-512.png"))
            
        print("Successfully removed black background and made the icon transparent!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    process()

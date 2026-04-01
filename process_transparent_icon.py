import os
from PIL import Image
from rembg import remove

def process():
    try:
        # File paths
        icon_path = r"C:\Users\ruiting\.gemini\antigravity\brain\258b2f85-7d95-498a-a1ff-d52b62fbf36a\gold_coin_white_dice_1775015023258.png"
        target_dir = r"c:\Users\ruiting\Desktop\tool"
        
        # Open source image and remove background
        with open(icon_path, 'rb') as i:
            input_img = i.read()
            
        print("Removing background... this might take several seconds the first time downloading the model...")
        output_img = remove(input_img)
        
        # Use PIL to resize the transparent image
        # Using BytesIO to parse the raw PNG bytes returned by rembg
        from io import BytesIO
        img = Image.open(BytesIO(output_img))
        img = img.convert("RGBA")
        
        # 192x192
        img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
        img_192.save(os.path.join(target_dir, "icon-192.png"))
        
        # 512x512
        img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
        img_512.save(os.path.join(target_dir, "icon-512.png"))
            
        print("Images formatted successfully with a transparent background!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    process()

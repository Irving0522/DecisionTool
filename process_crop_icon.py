import os
from PIL import Image

def process():
    try:
        # File paths - pointing to the ORIGINAL 3D silver coin icon generated earlier
        icon_path = r"C:\Users\ruiting\.gemini\antigravity\brain\258b2f85-7d95-498a-a1ff-d52b62fbf36a\app_icon_1775011293853.png"
        target_dir = r"c:\Users\ruiting\Desktop\tool"
        
        # Load the original generated image
        img = Image.open(icon_path).convert("RGB")
        
        # The AI drew a "fake" app icon inside the square, so there are dark corners outside the curve.
        # We need to crop to the inner safe zone to remove those painted corners!
        width, height = img.size
        
        # Let's crop 20% off every side
        crop_percent = 0.20
        left = int(width * crop_percent)
        top = int(height * crop_percent)
        right = int(width * (1 - crop_percent))
        bottom = int(height * (1 - crop_percent))
        
        cropped_img = img.crop((left, top, right, bottom))
        
        # Now stretch this pure internal cropped perfect gradient section back to 512x512 and 192x192
        # Now Android can cut its own rounded corners out of pure gradient, not the AI's painted corners!
        
        img_512 = cropped_img.resize((512, 512), Image.Resampling.LANCZOS)
        img_512.save(os.path.join(target_dir, "icon-512.png"))
        
        img_192 = img_512.resize((192, 192), Image.Resampling.LANCZOS)
        img_192.save(os.path.join(target_dir, "icon-192.png"))
        
        print("Success! Cropped the AI-painted corners and expanded the pure center gradient.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    process()

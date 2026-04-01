import os
from PIL import Image

def process():
    try:
        target_dir = r"c:\Users\ruiting\Desktop\tool"
        icon_path = os.path.join(target_dir, "icon-512.png")
        
        # Load the current transparent coin icon
        coin_img = Image.open(icon_path).convert("RGBA")
        
        # Calculate safe zone scale (Android adaptive icons crop outer edges)
        # 512 * 0.75 = 384
        safe_size = int(512 * 0.75)
        coin_img = coin_img.resize((safe_size, safe_size), Image.Resampling.LANCZOS)
        
        # Create a new full-bleed solid background
        # Using a sleek dark theme #0f172a or purple #1e1b4b, let's use the exact dark blue/slate from the app
        bg_color = "#0f172a" 
        
        # Generate 512x512
        bg_512 = Image.new("RGBA", (512, 512), bg_color)
        x_offset = (512 - safe_size) // 2
        bg_512.paste(coin_img, (x_offset, x_offset), coin_img)
        
        # Output as valid PNG with NO transparency for the background layer
        final_512 = bg_512.convert("RGB")
        final_512.save(os.path.join(target_dir, "icon-512.png"))
        
        # Generate 192x192
        final_192 = final_512.resize((192, 192), Image.Resampling.LANCZOS)
        final_192.save(os.path.join(target_dir, "icon-192.png"))
        
        print("Successfully generated full-bleed solid background icons!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    process()

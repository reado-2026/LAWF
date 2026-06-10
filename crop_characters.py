import os
from PIL import Image
from rembg import remove

def crop_and_extract():
    image_path = r'c:\Users\ASHIK\Desktop\LAWF\main\static\main\anu\image.png'
    if not os.path.exists(image_path):
        print(f"Error: {image_path} not found.")
        return

    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    print(f"Loaded image of size {width}x{height}")

    # Crop the bottom photo (y = 640 to 1280, x = 0 to 960)
    bottom_photo = img.crop((0, 640, width, height))
    
    # Crop the girl (left side of bottom photo) and boy (right side)
    # The girl is roughly x = 0 to 520, y = 0 to 640 inside the bottom photo
    # The boy is roughly x = 400 to 960, y = 0 to 640 inside the bottom photo
    # We add a bit of padding to let rembg detect the bodies properly
    girl_crop = bottom_photo.crop((0, 0, 560, 640))
    boy_crop = bottom_photo.crop((380, 0, 960, 640))

    print("Using rembg to remove background of the girl character...")
    try:
        girl_nobg = remove(girl_crop)
        # Crop transparent padding of the resulting cutout to make it snug
        girl_nobg = girl_nobg.crop(girl_nobg.getbbox())
    except Exception as e:
        print(f"rembg girl failed: {e}, falling back to original crop")
        girl_nobg = girl_crop

    print("Using rembg to remove background of the boy character...")
    try:
        boy_nobg = remove(boy_crop)
        # Crop transparent padding of the resulting cutout to make it snug
        boy_nobg = boy_nobg.crop(boy_nobg.getbbox())
    except Exception as e:
        print(f"rembg boy failed: {e}, falling back to original crop")
        boy_nobg = boy_crop

    # Save the cutouts
    output_dir = r'c:\Users\ASHIK\Desktop\LAWF\main\static\main\anu'
    girl_path = os.path.join(output_dir, 'girl_character.png')
    boy_path = os.path.join(output_dir, 'boy_character.png')
    
    girl_nobg.save(girl_path, "PNG")
    boy_nobg.save(boy_path, "PNG")
    print(f"Saved girl cutout to {girl_path}")
    print(f"Saved boy cutout to {boy_path}")

if __name__ == '__main__':
    crop_and_extract()

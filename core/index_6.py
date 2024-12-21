# ==================================================XXX==================================================
"""                                     This Code Is Used To Add The Watermark To The Re-Scaled Files In The Environment                                        """
# ==================================================XXX==================================================
import os
from PIL import Image, ImageDraw, ImageFont
def generate_watermark_grid(image_size, text, font, spacing_multiplier=1.5):
    draw = ImageDraw.Draw(Image.new("RGBA", image_size, (255, 255, 255, 0)))
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    spacing = int(max(text_width, text_height) * spacing_multiplier)
    positions = []
    for y in range(0, image_size[1], text_height + spacing):
        for x in range(0, image_size[0], text_width + spacing):
            positions.append((x, y))
    return positions
def add_watermark_to_image(input_path, output_path, text, font_path, opacity=50):
    image = Image.open(input_path).convert("RGBA")
    watermark = Image.new("RGBA", image.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(watermark)
    font_size = int(image.size[0] / 70)
    font = ImageFont.truetype(font_path, font_size)
    positions = generate_watermark_grid(image.size, text, font, spacing_multiplier=1.5)
    for position in positions:
        draw.text(position, text, font=font, fill=(255, 255, 255, opacity))
    watermarked_image = Image.alpha_composite(image, watermark).convert("RGB")
    watermarked_image.save(output_path, "JPEG")
    print(f"Watermarked image saved as {output_path}")
def process_images(input_folder, output_folder, text, font_path):
    os.makedirs(output_folder, exist_ok=True)
    for filename in os.listdir(input_folder):
        input_path = os.path.join(input_folder, filename)
        if os.path.isfile(input_path) and filename.lower().endswith((".png", ".jpg", ".jpeg")):
            output_path = os.path.join(output_folder, filename)
            add_watermark_to_image(input_path, output_path, text, font_path)
process_images(text="picBook™",  input_folder=os.path.join("sources", "base"),  output_folder=os.path.join("sources", "highRes"),  font_path=os.path.join("include", "Kurale.ttf"))
# ==================================================XXX================================================== 
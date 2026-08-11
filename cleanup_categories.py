import json

def merge_categories():
    json_path = 'src/data/products.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        products = json.load(f)

    mappings = {
        "Dış Mekan Led Şeritler": "Dış Mekan Şerit Led, Neon ve Ledli Hortumlar",
        "Ampul": "Ampuller",
        "Diğer": "Diğer Ürünler",
        "İç Mekan Led Şeritler": "Şerit Led"
    }
    
    count = 0
    for pid, p in products.items():
        if 'category' in p and p['category'] and 'tr' in p['category']:
            if len(p['category']['tr']) > 0:
                top_cat = p['category']['tr'][0]
                if top_cat in mappings:
                    p['category']['tr'][0] = mappings[top_cat]
                    count += 1
                    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
        
    print(f"Updated {count} products.")

if __name__ == '__main__':
    merge_categories()

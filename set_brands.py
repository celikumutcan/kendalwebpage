import json

def set_brands():
    json_path = 'src/data/products.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        products = json.load(f)

    vanti_count = 0
    k2_count = 0
    
    for pid, p in products.items():
        if p.get('model', '').startswith('KCF'):
            p['brand'] = 'vanti'
            vanti_count += 1
        else:
            p['brand'] = 'k2'
            k2_count += 1
            
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
        
    print(f"Updated brands: {vanti_count} Vanti, {k2_count} K2.")

if __name__ == '__main__':
    set_brands()

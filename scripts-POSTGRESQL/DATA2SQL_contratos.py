import pandas as pd

# Load the Excel file
file_path = '../../DATOS_CLIENTES/NEW/DATA_CONTRATOS_NEW.xlsx'
output_file = '../../SQL_MIGRATION/ROADMAP/insert_new_contract_data.sql'

# Read the Excel data
data = pd.read_excel(file_path)

# Replace NaN values with 'NULL' for SQL formatting
data = data.fillna('NULL')

def to_postgres_array(raw_string):
    """Convert stringified Python list to PostgreSQL array format."""
    if raw_string == 'NULL':
        return 'NULL'
    raw_string = raw_string.strip("[]")  # remove brackets
    elements = raw_string.split(',')
    cleaned_elements = []
    for e in elements:
        cleaned = e.strip().strip("'").strip('"')  # Limpia comillas simples y dobles
        cleaned_elements.append(f"'{cleaned}'")  # Vuelve a encerrar en comillas simples
    return f"ARRAY[{', '.join(elements)}]"

with open(output_file, 'w', encoding='utf-8') as file:
    for _, row in data.iterrows():
        # Parse and format array fields
        productos_servicios = to_postgres_array(row['Productos_Servicios'])
        cantidades = to_postgres_array(row['Cantidades'])
        precios = to_postgres_array(row['Precios'])

        # Format Fecha_Fin
        fecha_fin = 'NULL' if row['Fecha_Fin'] == 'NULL' else f"'{row['Fecha_Fin']}'"

        # Format Notas_Adicionales
        if row['Notas_Adicionales'] == 'NULL':
            notas_adicionales = 'NULL'
        else:
            notas_adicionales_clean = str(row['Notas_Adicionales']).replace("'", "''")
            notas_adicionales = f"'{notas_adicionales_clean}'"

        # Format full SQL insert statement
        statement = (
            f"INSERT INTO contratos (Id_Contrato, Id_Cliente, Productos_Servicios, Cantidades, Precios, Cuota, Tipo, Mes, Año, Fecha_Fin, Estado, Notas_Adicionales, Fecha_Inicio) "
            f"VALUES ({row['Id_Contrato']}, {row['Id_Cliente']}, {productos_servicios}, {cantidades}, {precios}, "
            f"{row['Cuota']}, '{row['Tipo']}', '{row['Mes']}', {row['Año']}, {fecha_fin}, '{row['Estado']}', {notas_adicionales}, '{row['Fecha_Inicio']}');\n"
        )

        file.write(statement)

print(f"✅ INSERT statements have been written to {output_file}")

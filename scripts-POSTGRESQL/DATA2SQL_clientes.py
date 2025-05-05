
import pandas as pd

# Load the Excel file
file_path = '../../DATOS_CLIENTES/NEW/DATA_CLIENTES_NEW.xlsx'  # Update with the correct path if needed
output_file = '../../SQL_MIGRATION/ROADMAP/insert_new_client_data.sql'

# Read the Excel data
data = pd.read_excel(file_path)

# Replace NaN values with 'NULL' for SQL formatting
data = data.fillna('NULL')

# Generate INSERT statements
with open(output_file, 'w') as file:
    for _, row in data.iterrows():
        statement = f"INSERT INTO clientes (Id_Cliente, Nombre, CIF, Direccion, CP, Ciudad, Provincia, Actividad, Horario, IBAN, Telefono, Direccion_Facturacion) VALUES ({row['Id_Cliente']}, '{row['Nombre']}', '{row['CIF']}', '{row['Direccion']}', {row['CP']}, '{row['Ciudad']}', '{row['Provincia']}', '{row['Actividad']}', '{row['Horario']}', '{row['IBAN']}', '{row['Telefono']}', '{row['Direccion_Facturacion']}');\n"
        file.write(statement)

print(f"INSERT statements have been written to {output_file}")

import pandas as pd

# File paths
file_path = '../../DATOS_CLIENTES/NEW/DATA_ACTIVOS_NEW.xlsx'  # Update with the correct path if needed
output_file = '../../SQL_MIGRATION/ROADMAP/insert_new_activos_data.sql'


# Read the Excel file
data = pd.read_excel(file_path)

# Replace NaN values with 'NULL' for SQL formatting
data = data.fillna('NULL')

# Generate INSERT statements
with open(output_file, 'w') as file:
    for _, row in data.iterrows():
        # Handle NULL values properly for Fecha_Retimbrado and Ubicacion/Notas
        fecha_retimbrado = 'NULL' if row['Fecha_Retimbrado'] == 'NULL' else row['Fecha_Retimbrado']
        ubicacion = 'NULL' if row['Ubicacion'] == 'NULL' else f"'{row['Ubicacion']}'"
        notas = 'NULL' if row['Notas'] == 'NULL' else f"'{row['Notas']}'"

        # Construct the INSERT statement
        statement = (
            f"INSERT INTO activos (Id_Activo, Id_Cliente, Nombre, Cantidad, Marca_Modelo, Tipo, N_Identificador, Fecha_Fabricacion, Fecha_Retimbrado, Estado, Ubicacion, Notas, Id_Contrato) "
            f"VALUES ({row['Id_Activo']}, {row['Id_Cliente']}, '{row['Nombre']}', {row['Cantidad']}, '{row['Marca_Modelo']}', '{row['Tipo']}', '{row['N_Identificador']}', {row['Fecha_Fabricacion']}, {fecha_retimbrado}, '{row['Estado']}', {ubicacion}, {notas}, -1);\n"
        )
        file.write(statement)

print(f"INSERT statements have been written to {output_file}")
import { getExtintoresCaducados } from '../../../services/extintoresService'; 

export const existenNuevosExtintores = (formData) => {
    if (formData.productos_servicios.some(c => c.includes('Nuevo extintor'))) {
        return true
    } else {
        return false
    }
}

export const validateExtintoresCaducados = async (albaranData) => {
    // Comprobar extintores caducados del cliente en BBDD Activos
    const extintoresCaducados = await getExtintoresCaducados(albaranData.id_cliente, albaranData.id_contrato)

    /// Extraer cantidad de nuevos extintores en albaran verificado
    const listaNuevos = albaranData.productos_servicios.filter((c) =>
        c.includes("Nuevo extintor")
    );
    
    const listaNuevosCantidades = listaNuevos.map((concepto) =>
        Number(albaranData.cantidades[albaranData.productos_servicios.indexOf(concepto)])
    );
    
    // Calcular el total de cantidades
    const totalNuevosCantidades = listaNuevosCantidades.reduce((sum, cantidad) => sum + cantidad, 0);
  
    // Si hay más extintores nuevos que caducados alertar que debe crearse nuevo contrato
    if (extintoresCaducados.length < totalNuevosCantidades) {
        const proceed = window.confirm("Los extintores en BBDD no coinciden, ¿está seguro que desea proceder?");
        if (proceed) {
            alert("No se olvide crear un contrato nuevo con los nuevos extintores");
            return true; 
        } else {
            return false; 
        }
    }

    return true
};
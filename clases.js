
export class Veiculo{

    id = 0;
    modelo = "";
    anoFabricacion = 0;
    velMax = 0;

    constructor(id,modelo,anoFabricacion,velMax){
        
        this.id = id;
        this.modelo = modelo;
        this.anoFabricacion = anoFabricacion;
        this.velMax = velMax;

    }

    toString(){

        return "id:" +this.id.toString()+ "\nmodelo: " + this.modelo.toString() + "\nanioFabricacion: " + this.anoFabricacion.toString() +  "\nvelMax: " +this.velMax.toString();

    }

    toJson(){

        return {
            id:this.id,
            modelo: this.modelo,
            anoFabricacion: this.anoFabricacion,
            velMax: this.velMax}

    }


}

export class Auto extends Veiculo{

    cantidadPuertas = 0;
    asientos= 0;

    constructor(id,modelo,anoFabricacion,velMax,cantidadPuertas,asientos){

        super(id,modelo,anoFabricacion,velMax);
        this.cantidadPuertas = cantidadPuertas;
        this.asientos = asientos;

    }

    toString(){

        return "id:" +this.id.toString()+ "\nmodelo: " + this.modelo.toString() + "\nanioFabricacion: " + this.anoFabricacion.toString() + "\nvelMax: " +this.velMax.toString() + "\ncantidadPuetas: " +this.cantidadPuertas.toString() + "\nasientos: " +this.asientos.toString() ;

    }

    toJson(){

        return {
            id:this.id,
            modelo: this.modelo,
            anoFabricacion: this.anoFabricacion,
            velMax: this.velMax,
            cantidadPuertas: this.cantidadPuertas,
            asientos: this.asientos
        }

    }

}

export class Camion extends Veiculo{

    carga = 0;
    autonomia = 0;

    
    constructor(id,modelo,anoFabricacion,velMax,carga,autonomia){
        
        super(id,modelo,anoFabricacion,velMax);
        this.carga = carga;
        this.autonomia = autonomia;

    }

    toString(){

        return "id:" +this.id.toString()+ "\nmodelo: " + this.modelo.toString() + "\nanioFabricacion: " + this.anoFabricacion.toString() +  "\nvelMax: " +this.velMax.toString() + "\ncarga: " +this.carga.toString() + "\nautonomia: " +this.autonomia.toString();

    }

    toJson(){

        return {
            id:this.id,
            modelo: this.modelo,
            anoFabricacion: this.anoFabricacion,
            velMax: this.velMax,
            carga: this.carga,
            autonomia: this.autonomia
        }

    }
}
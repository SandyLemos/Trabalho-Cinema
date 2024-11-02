class CidadeModel {
    constructor(id, nome, idEstado) {
        this.id = id;
        this.nome = nome;
        this.idEstado = idEstado;
    }

    static fromApi(data) {
        return new CidadeModel(data.id_cidade, data.nome_cidade, data.id_estado);
    }
}

export default CidadeModel;

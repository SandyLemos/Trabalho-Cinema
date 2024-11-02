class EstadoModel {
    constructor(id, nome, sigla) {
        this.id = id;
        this.nome = nome;
        this.sigla = sigla;
    }

    static fromApi(data) {
        return new EstadoModel(data.id_estado, data.nome_estado, data.sigla_estado);
    }
}

export default EstadoModel;

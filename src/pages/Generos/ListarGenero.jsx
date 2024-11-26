import { useEffect, useState } from 'react';
import GenerosService from '../../services/GenerosService'; // Importando o serviço para gerenciar os gêneros
import styles from "../../styles/lista.generos.module.css"; // Supondo que você tenha o estilo adequado
import { useNavigate } from "react-router-dom"; // Para navegar entre as páginas

const ListarGeneros = () => {
    const [generos, setGeneros] = useState([]);
    const navigate = useNavigate();

    // Função para carregar os gêneros
    const loadGeneros = async () => {
        try {
            const response = await GenerosService.getAllGenres(); // Chama o serviço para buscar todos os gêneros
            console.log("Gêneros recebidos:", response); // Verifique a resposta da API aqui
            // Verifique se o retorno contém a chave 'genres' e é um array
            if (response && Array.isArray(response.genres)) {
                setGeneros(response.genres); // Atualiza o estado com o array de gêneros
            } else {
                console.error("Erro: A resposta da API não contém a chave 'genres' ou ela não é um array.");
                setGeneros([]); // Garante que generos seja um array vazio em caso de erro
            }
        } catch (error) {
            console.error("Erro ao carregar gêneros:", error);
            setGeneros([]); // Garante que generos seja um array vazio em caso de erro
        }
    };

    // Carrega os gêneros assim que o componente for montado
    useEffect(() => {
        loadGeneros();
    }, []);

    // Funções para editar e deletar
    const handleEdit = (id) => {
        navigate(`/editar-genero/${id}`);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja deletar este gênero?");

        if (confirmDelete) {
            console.log("Deletando gênero com ID:", id);
            GenerosService.deleteGenre(id)
                .then(() => {
                    // Caso a exclusão seja bem-sucedida, atualize o estado
                    setGeneros(generos.filter(genre => genre.id_genero !== id)); // Alterado 'id' para 'id_genero'
                    alert("Gênero deletado com sucesso!");
                })
                .catch(error => {
                    console.error("Erro ao deletar gênero:", error);
                    alert("Erro ao deletar gênero.");
                });
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Gêneros</h2>
            <div className={styles.layoutContainer}>
                {generos.length === 0 ? (
                    <p>Não há gêneros disponíveis.</p>
                ) : (
                    generos.map((genero) => (
                        <div key={genero.id_genero} className={styles.genreItem}> 
                            <div className={styles.genreDetails}>
                                <p><strong>Nome:</strong> {genero.nome_genero}</p> 
                            </div>
                            <div className={styles.genreActions}>
                                <button className={styles.actionButton} onClick={() => handleEdit(genero.id_genero)} disabled={!genero.ativo}>
                                    Editar
                                </button>
                                <button className={styles.actionButton} onClick={() => handleDelete(genero.id_genero)}>
                                    Deletar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListarGeneros;

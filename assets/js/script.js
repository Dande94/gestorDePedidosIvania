document.addEventListener("DOMContentLoaded", function () {
    const pedidos = {
        sobremesa: {}
    };

    // Função para adicionar ou atualizar um item no pedido
    // function adicionarItem(categoria, nome, preco, quantidade) {
    //     if (!categoria[nome]) {
    //         categoria[nome] = { preco: parseFloat(preco.replace(',', '.')), quantidade: 0 };
    //     }
    //     categoria[nome].quantidade += quantidade;
    //     atualizarTotal(); // Atualiza o total após adicionar o item
    // }
    // Função para adicionar ou atualizar um item no pedido
    function adicionarItem(categoria, nome, preco, novaQuantidade) {
        if (!categoria[nome]) {
            // Se o item não existe, cria um novo com a quantidade inicial
            categoria[nome] = { preco: parseFloat(preco.replace(',', '.')), quantidade: 0 };
        }
        // Atualiza a quantidade com a nova quantidade passada (não somando)
        categoria[nome].quantidade = novaQuantidade;
        atualizarTotal(); // Atualiza o total após a alteração da quantidade
    }


    // Função para calcular e atualizar o total da compra
    function atualizarTotal() {
        const totalPrecoSobremesa = Object.values(pedidos.sobremesa).reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalFormatado = totalPrecoSobremesa.toFixed(2).replace('.', ',');

        // Atualiza o elemento que mostra o total
        document.getElementById("total-compra").textContent = `Total: R$${totalFormatado}`;
    }
        // Alterna a visibilidade do formulário de delivery
    function alternarPedido() {
        const opcaoRetirada = document.getElementById("retirada");
        const opcaoDelivery = document.getElementById("delivery");
        const formDelivery = document.getElementById("form-delivery");

        if (opcaoDelivery.checked) {
            formDelivery.style.display = "block";
        } else {
            formDelivery.style.display = "none";
        }
    }

    // Define o listener para alterar o formulário conforme o tipo de pedido
    document.getElementById("retirada").addEventListener("change", alternarPedido);
    document.getElementById("delivery").addEventListener("change", alternarPedido);

    // Função para confirmar a quantidade de um item
    // function confirmarQuantidade(button) {
    //     const itemID = button.getAttribute("data-item");
    //     const tipo = button.getAttribute("data-tipo");
    //     const itemSelecionado = document.getElementById(itemID);
    //     const nomeItem = itemSelecionado.querySelector("h4").textContent;
    //     const precoItem = itemSelecionado.querySelector("strong").textContent;
    //     const quantidadeItem = parseInt(itemSelecionado.querySelector("input[type='number']").value || 1);

    //     adicionarItem(pedidos[tipo], nomeItem, precoItem, quantidadeItem);

    //     itemSelecionado.classList.add("item-selecionado"); // Adiciona a classe CSS para a aura verde
    //     itemSelecionado.querySelector(".confirmacao").textContent = `${nomeItem} adicionado com quantidade ${quantidadeItem}.`;
    // }
    function confirmarQuantidade(button) {
        const itemID = button.getAttribute("data-item");
        const tipo = button.getAttribute("data-tipo");
        const itemSelecionado = document.getElementById(itemID);
        const nomeItem = itemSelecionado.querySelector("h4").textContent;
        const precoItem = itemSelecionado.querySelector("strong").textContent;
        const quantidadeItem = parseInt(itemSelecionado.querySelector("input[type='number']").value || 1);
    
        // Atualiza a quantidade diretamente
        adicionarItem(pedidos[tipo], nomeItem, precoItem, quantidadeItem);
    
        itemSelecionado.classList.add("item-selecionado");
        itemSelecionado.querySelector(".confirmacao").textContent = `${nomeItem} adicionado com quantidade ${quantidadeItem}.`;
    }
    

    // Função para finalizar o pedido
    function finalizarPedido() {
        const metodoPagamento = document.getElementById("metodoPagamento").value;

        // Função para formatar os itens do pedido para exibição
        function formatarItens(categoria) {
            return Object.keys(categoria).map(nome => {
                const { preco, quantidade } = categoria[nome];
                const totalItem = (preco * quantidade).toFixed(2).replace('.', ',');
                return `${nome} (x${quantidade}) - R$${totalItem}`;
            }).join('\n');
        }

        const totalPrecoSobremesa = Object.values(pedidos.sobremesa).reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalFormatado = totalPrecoSobremesa.toFixed(2).replace('.', ',');

        let detalhesPedido = "";
        const tipoPedido = document.querySelector('input[name="tipoPedido"]:checked').value;

        // Verifica os dados para delivery ou retirada
        if (tipoPedido === "delivery") {
            const nome = document.getElementById("nome").value;
            const local = document.getElementById("local").value;
            const observacoes = document.getElementById("observacoes").value;

            if (!nome || !local) {
                alert("Por favor, preencha todos os campos de delivery.");
                return;
            }

            detalhesPedido = `\n\nDetalhes de Delivery:\nNome: ${nome}\nEndereço: ${local}\n\nObservações: ${observacoes}`;
        } else if (tipoPedido === "retirada") {
            detalhesPedido = `\n\nPedido para Retirada.`;
        }

        const mensagem = `Olá! Gostaria de pedir sobremesas:\n\n*Sobremesas*:\n${formatarItens(pedidos.sobremesa)}\n____________________\n*Pagamento*: ${metodoPagamento} - *Total*: R$${totalFormatado}.${detalhesPedido}`;

        window.open(`https://wa.me/+5547996783299?text=${encodeURIComponent(mensagem)}`);
    }

    // Adiciona listeners aos botões de confirmação
    document.querySelectorAll(".sobremesa .item .btn-confirmar").forEach(button => {
        button.addEventListener("click", function () {
            confirmarQuantidade(button);
        });
    });

    document.getElementById("btn-finalizar").addEventListener("click", finalizarPedido);

    const observerSobremesas = new MutationObserver(function () {
        document.querySelectorAll(".sobremesa .item .btn-confirmar").forEach(button => { button.addEventListener("click", function () { confirmarQuantidade(button); }); });
    });

    observerSobremesas.observe(document.querySelector('.sobremesa'), { childList: true });

});

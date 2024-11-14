/*
document.addEventListener("DOMContentLoaded", function () {
    // Array de objetos representando todos os itens de produtos
    var desc = "Potinho de 100ml de mousse";
    var showPrice = "03,00";
    var initMousse = "Mousse de ";
    var tipo = "sobremesa";
    const itens = [
        { id: "Chocolate", nome: `${initMousse}Chocolate`, descricao: desc , preco: showPrice, imgSrc: "assets/img/mousse_chocolate.jpeg", tipo: tipo },
        { id: "Maracuja", nome: `${initMousse}Maracujá`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_maracuja.jpeg", tipo: tipo },
        { id: "Uva", nome: `${initMousse}Uva`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_uva.jpeg", tipo: tipo },
        { id: "Limao", nome: `${initMousse}Limão`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_limao.jpeg", tipo: tipo },
        { id: "Cafe", nome: `${initMousse}Café`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_cafe.jpeg", tipo: tipo },
        { id: "Morango", nome: `${initMousse}Morango`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_morango.jpeg", tipo: tipo }
    ];

    // Array para armazenar o pedido (apenas sobremesas)
    const pedidos = { sobremesa: {} };

    // Seleciona a section correta
    const sectionSobremesa = document.querySelector('.produtos.sobremesa');

    // Função para adicionar ou atualizar o item no pedido
    function adicionarItem(nome, preco, quantidade) {
        if (!pedidos.sobremesa[nome]) {
            pedidos.sobremesa[nome] = { preco: parseFloat(preco.replace(',', '.')), quantidade: 0 };
        }
        pedidos.sobremesa[nome].quantidade += quantidade;
        atualizarTotal(); // Atualiza o total após adicionar o item
    }

    // Função para calcular e atualizar o total da compra
    function atualizarTotal() {
        const totalPrecoSobremesa = Object.values(pedidos.sobremesa).reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalFormatado = totalPrecoSobremesa.toFixed(2).replace('.', ',');
        document.getElementById("total-compra").textContent = `Total: R$${totalFormatado}`;
    }

    // Percorre todos os itens e insere na section correta
    itens.forEach(item => {
        const itemHTML = `
            <div id="${item.id}" class="item" data-tipo="${item.tipo}">
                <h4>${item.nome}</h4>
                <div class="item-desc">
                    <div class="desc">
                        <article>${item.descricao}</article>
                        <p><sup>R$</sup><strong>${item.preco}</strong></p>
                        <label>Qtd:</label>
                        <div class="contador">
                            <div class="qtd-itens">
                                <button type="button" class="btn-decrementar" data-id="quantidade${item.id}">-</button>
                                <input type="number" id="quantidade${item.id}" value="0" min="0">
                                <button type="button" class="btn-incrementar" data-id="quantidade${item.id}">+</button>
                            </div>
                            <div>
                                <button class="btn-confirmar" data-item="${item.id}" data-tipo="${item.tipo}">Confirmar</button>
                            </div>
                        </div>
                    </div>
                    <div class="img-produto">
                        <img src="${item.imgSrc}" alt="${item.nome}">
                    </div>
                </div>
            </div>
        `;
        sectionSobremesa.insertAdjacentHTML('beforeend', itemHTML);
    });

    // // Adiciona eventos para os botões de incrementar e decrementar
    // document.body.addEventListener('click', function (event) {
    //     if (event.target.classList.contains('btn-incrementar')) {
    //         const inputId = event.target.getAttribute('data-id');
    //         const input = document.getElementById(inputId);
    //         input.value = parseInt(input.value) + 1;
    //     } else if (event.target.classList.contains('btn-decrementar')) {
    //         const inputId = event.target.getAttribute('data-id');
    //         const input = document.getElementById(inputId);
    //         if (parseInt(input.value) > 0) {
    //             input.value = parseInt(input.value) - 1;
    //         }
    //     }
    // });

    // // Adiciona evento ao botão de confirmar
    // document.body.addEventListener('click', function (event) {
    //     if (event.target.classList.contains('btn-confirmar')) {
    //         const itemID = event.target.getAttribute("data-item");
    //         const itemSelecionado = document.getElementById(itemID);
    //         const nomeItem = itemSelecionado.querySelector("h4").textContent;
    //         const precoItem = itemSelecionado.querySelector("strong").textContent;
    //         const quantidadeItem = parseInt(itemSelecionado.querySelector("input[type='number']").value || 1);
    //         adicionarItem(nomeItem, precoItem, quantidadeItem);
    //         itemSelecionado.style.borderColor = "green"; // Feedback visual para item adicionado
    //     }
    // });
    // Adiciona eventos para os botões de incrementar e decrementar e atualiza o total em tempo real
  // Adiciona eventos para os botões de incrementar e decrementar e atualiza o total em tempo real
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-incrementar')) {
            const inputId = event.target.getAttribute('data-id');
            const input = document.getElementById(inputId);
            input.value = parseInt(input.value) + 1;
            atualizarTotal(); // Atualiza o total após a alteração
        } else if (event.target.classList.contains('btn-decrementar')) {
            const inputId = event.target.getAttribute('data-id');
            const input = document.getElementById(inputId);
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
                atualizarTotal(); // Atualiza o total após a alteração
            }
        }
    });

    // Adiciona evento ao botão de confirmar e atualiza o total
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-confirmar')) {
            const itemID = event.target.getAttribute("data-item");
            const itemSelecionado = document.getElementById(itemID);
            const nomeItem = itemSelecionado.querySelector("h4").textContent;
            const precoItem = itemSelecionado.querySelector("strong").textContent;
            const quantidadeItem = parseInt(itemSelecionado.querySelector("input[type='number']").value || 1);
            adicionarItem(nomeItem, precoItem, quantidadeItem);
            itemSelecionado.style.borderColor = "green"; // Feedback visual para item adicionado
            atualizarTotal(); // Atualiza o total após a confirmação
        }
    });


});

__________________________________________
document.addEventListener("DOMContentLoaded", function () {
    // Array de objetos representando todos os itens de produtos
    var desc = "Potinho de 100ml de mousse";
    var showPrice = "03,00";
    var initMousse = "Mousse de ";
    var tipo = "sobremesa";
    const itens = [
        { id: "Chocolate", nome: `${initMousse}Chocolate`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_chocolate.jpeg", tipo: tipo },
        { id: "Maracuja", nome: `${initMousse}Maracujá`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_maracuja.jpeg", tipo: tipo },
        { id: "Uva", nome: `${initMousse}Uva`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_uva.jpeg", tipo: tipo },
        { id: "Limao", nome: `${initMousse}Limão`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_limao.jpeg", tipo: tipo },
        { id: "Cafe", nome: `${initMousse}Café`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_cafe.jpeg", tipo: tipo },
        { id: "Morango", nome: `${initMousse}Morango`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_morango.jpeg", tipo: tipo }
    ];

    // Objeto para armazenar o pedido (apenas sobremesas)
    const pedidos = { sobremesa: {} };

    // Seleciona a section correta
    const sectionSobremesa = document.querySelector('.produtos.sobremesa');

    // Função para adicionar ou atualizar o item no pedido
    function adicionarItem(nome, preco, quantidade) {
        if (quantidade > 0) {
            pedidos.sobremesa[nome] = { preco: parseFloat(preco.replace(',', '.')), quantidade: quantidade };
        } else {
            delete pedidos.sobremesa[nome]; // Remove o item se a quantidade for zero
        }
        atualizarTotal(); // Atualiza o total após a confirmação
    }

    // Função para calcular e atualizar o total da compra
    function atualizarTotal() {
        const totalPrecoSobremesa = Object.values(pedidos.sobremesa).reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalFormatado = totalPrecoSobremesa.toFixed(2).replace('.', ',');
        document.getElementById("total-compra").textContent = `Total: R$${totalFormatado}`;
    }

    // Percorre todos os itens e insere na section correta
    itens.forEach(item => {
        const itemHTML = `
            <div id="${item.id}" class="item" data-tipo="${item.tipo}">
                <h4>${item.nome}</h4>
                <div class="item-desc">
                    <div class="desc">
                        <article>${item.descricao}</article>
                        <p><sup>R$</sup><strong>${item.preco}</strong></p>
                        <label>Qtd:</label>
                        <div class="contador">
                            <div class="qtd-itens">
                                <button type="button" class="btn-decrementar" data-id="quantidade${item.id}">-</button>
                                <input type="number" id="quantidade${item.id}" value="0" min="0">
                                <button type="button" class="btn-incrementar" data-id="quantidade${item.id}">+</button>
                            </div>
                            <div>
                                <button class="btn-confirmar" data-item="${item.id}" data-tipo="${item.tipo}">Confirmar</button>
                            </div>
                        </div>
                    </div>
                    <div class="img-produto">
                        <img src="${item.imgSrc}" alt="${item.nome}">
                    </div>
                </div>
            </div>
        `;
        sectionSobremesa.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Eventos de incremento e decremento de quantidade
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-incrementar')) {
            const inputId = event.target.getAttribute('data-id');
            const input = document.getElementById(inputId);
            input.value = parseInt(input.value) + 1;
        } else if (event.target.classList.contains('btn-decrementar')) {
            const inputId = event.target.getAttribute('data-id');
            const input = document.getElementById(inputId);
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
            }
        }
    });

    // Evento para confirmar a adição de itens
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-confirmar')) {
            const itemID = event.target.getAttribute("data-item");
            const itemSelecionado = document.getElementById(itemID);
            const nomeItem = itemSelecionado.querySelector("h4").textContent;
            const precoItem = itemSelecionado.querySelector("strong").textContent;
            const quantidadeItem = parseInt(itemSelecionado.querySelector("input[type='number']").value || 0);

            if (quantidadeItem >= 0) {
                adicionarItem(nomeItem, precoItem, quantidadeItem);
                itemSelecionado.style.borderColor = quantidadeItem > 0 ? "green" : "initial"; // Feedback visual
                itemSelecionado.querySelector("input[type='number']").value = 0; // Reseta a quantidade após confirmação
            } else {
                itemSelecionado.style.borderColor = "red"; // Feedback visual se a quantidade for negativa
            }
        }
    });
});
*/

document.addEventListener("DOMContentLoaded", function () {
    // Array de objetos representando todos os itens de produtos
    var desc = "Potinho de 100ml de mousse";
    var showPrice = "03,00";
    var initMousse = "Mousse de ";
    var tipo = "sobremesa";
    const itens = [
        { id: "Chocolate", nome: `${initMousse}Chocolate`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_chocolate.jpeg", tipo: tipo },
        { id: "Maracuja", nome: `${initMousse}Maracujá`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_maracuja.jpeg", tipo: tipo },
        { id: "Uva", nome: `${initMousse}Uva`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_uva.jpeg", tipo: tipo },
        { id: "Limao", nome: `${initMousse}Limão`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_limao.jpeg", tipo: tipo },
        { id: "Cafe", nome: `${initMousse}Café`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_cafe.jpeg", tipo: tipo },
        { id: "Morango", nome: `${initMousse}Morango`, descricao: desc, preco: showPrice, imgSrc: "assets/img/mousse_morango.jpeg", tipo: tipo }
    ];

    // Objeto para armazenar o pedido (apenas sobremesas)
    const pedidos = { sobremesa: {} };

    // Adiciona a <ul> antes do form de delivery
    const formDelivery = document.getElementById('form-delivery');
    const listaPedidos = document.createElement('ul');
    listaPedidos.id = 'lista-pedidos';
    formDelivery.parentNode.insertBefore(listaPedidos, formDelivery);

    // Seleciona a section correta
    const sectionSobremesa = document.querySelector('.produtos.sobremesa');

    // Função para adicionar ou atualizar o item no pedido
    function adicionarItem(nome, preco, quantidade) {
        if (quantidade > 0) {
            pedidos.sobremesa[nome] = { preco: parseFloat(preco.replace(',', '.')), quantidade: quantidade };
        } else {
            delete pedidos.sobremesa[nome]; // Remove o item se a quantidade for zero
        }
        atualizarListaPedidos(); // Atualiza a lista de pedidos visível
        atualizarTotal(); // Atualiza o total após a confirmação
    }

    // Função para atualizar a lista de pedidos na tela
    function atualizarListaPedidos() {
        listaPedidos.innerHTML = ''; // Limpa a lista antes de atualizar
        Object.entries(pedidos.sobremesa).forEach(([nome, item]) => {
            const li = document.createElement('li');
            li.textContent = `${item.quantidade} - ${nome}`;
            listaPedidos.appendChild(li);
        });
    }

    // Função para calcular e atualizar o total da compra
    function atualizarTotal() {
        const totalPrecoSobremesa = Object.values(pedidos.sobremesa).reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalFormatado = totalPrecoSobremesa.toFixed(2).replace('.', ',');
        document.getElementById("total-compra").textContent = `Total: R$${totalFormatado}`;
    }

    // Percorre todos os itens e insere na section correta
    itens.forEach(item => {
        const itemHTML = `
            <div id="${item.id}" class="item" data-tipo="${item.tipo}">
                <h4>${item.nome}</h4>
                <div class="item-desc">
                    <div class="desc">
                        <article>${item.descricao}</article>
                        <p><sup>R$</sup><strong>${item.preco}</strong></p>
                        <label>Qtd:</label>
                        <div class="contador">
                            <div class="qtd-itens">
                                <button type="button" class="btn-decrementar" data-id="quantidade${item.id}">-</button>
                                <input type="number" id="quantidade${item.id}" value="0" min="0">
                                <button type="button" class="btn-incrementar" data-id="quantidade${item.id}">+</button>
                            </div>
                            <div>
                                <button class="btn-confirmar" data-item="${item.id}" data-tipo="${item.tipo}">Confirmar</button>
                            </div>
                        </div>
                    </div>
                    <div class="img-produto">
                        <img src="${item.imgSrc}" alt="${item.nome}">
                    </div>
                </div>
            </div>
        `;
        sectionSobremesa.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Eventos de incremento e decremento de quantidade
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-incrementar')) {
            const inputId = event.target.getAttribute('data-id');
            const input = document.getElementById(inputId);
            input.value = parseInt(input.value) + 1;
        } else if (event.target.classList.contains('btn-decrementar')) {
            const inputId = event.target.getAttribute('data-id');
            const input = document.getElementById(inputId);
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
            }
        }
    });

    // Evento para confirmar a adição de itens
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-confirmar')) {
            const itemID = event.target.getAttribute("data-item");
            const itemSelecionado = document.getElementById(itemID);
            const nomeItem = itemSelecionado.querySelector("h4").textContent;
            const precoItem = itemSelecionado.querySelector("strong").textContent;
            const quantidadeItem = parseInt(itemSelecionado.querySelector("input[type='number']").value || 0);

            if (quantidadeItem >= 0) {
                adicionarItem(nomeItem, precoItem, quantidadeItem);
                itemSelecionado.style.borderColor = quantidadeItem > 0 ? "green" : "initial"; // Feedback visual
                itemSelecionado.querySelector("input[type='number']").value = 0; // Reseta a quantidade após confirmação
            } else {
                itemSelecionado.style.borderColor = "red"; // Feedback visual se a quantidade for negativa
            }
        }
    });
});

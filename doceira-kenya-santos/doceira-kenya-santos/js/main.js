document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DOS FILTROS DO CATÁLOGO ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filterValue = this.getAttribute('data-filter');

                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    card.style.display = 'none';
                    if (filterValue === 'todos' || filterValue === cardCategory) {
                        card.style.display = 'flex'; 
                    }
                });
            });
        });
    }

    // --- LÓGICA DO MODAL (POP-UP) DE DETALHES ---
    const modal = document.getElementById('product-modal');
    const detailButtons = document.querySelectorAll('.btn-secondary');
    
    if (modal) {
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const closeModalBtn = document.getElementById('close-modal-btn');

        detailButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Impede que o link '#' mude a URL
                const card = this.closest('.product-card');
                const imgSrc = card.querySelector('img').src;
                const title = card.querySelector('h3').innerText;
                const desc = card.querySelector('p').innerText;

                modalImg.src = imgSrc;
                modalTitle.innerText = title;
                modalDesc.innerText = desc + " Para mais detalhes sobre ingredientes e tamanhos, entre em contato."; // Adiciona um texto extra
                modal.style.display = 'flex';
            });
        });

        closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // --- LÓGICA DO FORMULÁRIO DE ENCOMENDA ---
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const orderDetails = document.getElementById('order-details').value;
            const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
            const eventDate = document.getElementById('event-date').value;

            const whatsappNumber = "5531997204144"; // Número da Kenya

            // Formata a data para o padrão brasileiro
            const formattedDate = new Date(eventDate + 'T00:00:00').toLocaleDateString('pt-BR');

            // Monta a mensagem
            let message = `*--- NOVO PEDIDO DO SITE ---*\n\n`;
            message += `*Cliente:* ${name}\n`;
            message += `*Contato:* ${phone}\n\n`;
            message += `*Pedido:*\n${orderDetails}\n\n`;
            message += `*Preferência:* ${deliveryOption}\n`;
            message += `*Data do Evento/Retirada:* ${formattedDate}\n\n`;
            message += `Aguardando confirmação. Obrigado!`;

            // Codifica a mensagem para URL e abre o link do WhatsApp
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os botões de encomenda
    const botoesEncomendar = document.querySelectorAll('.btn-encomendar');
    
    // Número de telefone para onde a mensagem será enviada (formato internacional)
    const numeroWhatsapp = '5531984173087';

    botoesEncomendar.forEach(function(botao) {
        botao.addEventListener('click', function() {
            // Pega as informações do produto a partir do card pai
            const card = botao.closest('.product-card');
            const nomeProduto = card.querySelector('h3').innerText;
            
            // Cria a mensagem
            const mensagem = `Olá, Kenya! Tenho interesse em encomendar o seguinte produto: *${nomeProduto}*. Podemos conversar?`;
            
            // Codifica a mensagem para ser usada em uma URL
            const mensagemCodificada = encodeURIComponent(mensagem);
            
            // Cria o link universal do WhatsApp
            const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensagemCodificada}`;
            
            // Abre o link em uma nova aba
            window.open(linkWhatsapp, '_blank');
        });
    });
});

// CÓDIGO PARA ENCOMENDA VIA WHATSAPP
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os botões de encomenda
    const botoesEncomendar = document.querySelectorAll('.btn-encomendar');
    
    // ATENÇÃO: Coloque aqui o número de telefone correto no formato 55 (Brasil) + DDD + Número
    const numeroWhatsapp = '5531997204144';

    botoesEncomendar.forEach(function(botao) {
        botao.addEventListener('click', function() {
            // Pega as informações do produto a partir do card "pai" do botão
            const card = botao.closest('.product-card');
            const nomeProduto = card.querySelector('h3').innerText;
            
            // Cria a mensagem personalizada
            const mensagem = `Olá! Vim pelo site e tenho interesse em encomendar o seguinte produto: *${nomeProduto}*. Podemos conversar?`;
            
            // Codifica a mensagem para ser usada em uma URL (resolve problemas com espaços e acentos)
            const mensagemCodificada = encodeURIComponent(mensagem);
            
            // Cria o link universal do WhatsApp
            const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensagemCodificada}`;
            
            // Abre o link em uma nova aba do navegador
            window.open(linkWhatsapp, '_blank');
        });
    });

    // Se você já tem código para o MODAL e para os FILTROS, mantenha ele aqui.
    // Este novo código de encomenda não interfere com os outros.
});
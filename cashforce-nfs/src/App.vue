<template>
  <div class="notas-fiscais-container">
    <aside class="sidebar">
      <div class="logo-container">
        <img :src="require('@/assets/Logo.png')" alt="Company Logo" class="logo-image" />
      </div>
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item active">
            <div class="nav-indicator"></div>
            <div class="nav-content">
              <img :src="require('@/assets/green.png')" alt="Notas Fiscais Icon" class="nav-icon" />
              <span class="nav-text">Notas fiscais</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="main-content">
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <img :src="require('@/assets/handshake.png')" alt="Notas Fiscais Icon" class="title-icon" />
            Notas fiscais
          </h1>
          <p class="page-description">Visualize as notas fiscais que você tem.</p>
        </div>
      </header>
      <div class="table-section">
        <div class="table-header">
          <span class="row-item">nota fiscal</span>
          <span class="row-item">sacado</span>
          <span class="row-item">cedente</span>
          <span class="row-item">emissão</span>
          <span class="row-item">valor</span>
          <span class="row-item">status</span>
        </div>
        <div v-for="(nota, index) in notasFiscais" :key="index" class="table-row">
          <div class="nota-details">
            <span class="row-item">{{ nota.numero }}</span>
            <span class="row-item">{{ nota.sacado }}</span>
            <span class="row-item">{{ nota.cedente }}</span>
            <span class="row-item">{{ nota.emissao }}</span>
            <span class="row-item nota-green">{{ nota.valor }}</span>
            <span class="row-item nota-green">{{ nota.status }}</span>
          </div>
          <button class="details-button">Dados do cedente</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import axios from 'axios';


export default defineComponent({
  name: 'NotasFiscais',
  data() {
    return {
      notasFiscais: []
    };
  },
  created() {
    this.fetchNotasFiscais();
  },
  methods: {
    async fetchNotasFiscais() {
      try {
        const response = await axios.get('http://localhost:3000/orders');
        this.notasFiscais = await this.formatNotasFiscais(response.data);
      } catch (error) {
        console.error('Error fetching notas fiscais:', error);
      }
    },
    async formatNotasFiscais(notas) {
      const statusMap = [
        'Pendente de confirmação',
        'Pedido confirmado',
        'Não reconhece o pedido',
        'Mercadoria não recebida',
        'Recebida com avaria',
        'Devolvida',
        'Recebida com devolução parcial',
        'Recebida e confirmada',
        'Pagamento Autorizado'
      ];

      const formattedNotas = await Promise.all(notas.map(async (nota) => {
        const sacadoResponse = await axios.get('http://localhost:3000/buyers/' + nota.buyerId);
        const cedenteResponse = await axios.get('http://localhost:3000/providers/' + nota.providerId);

        return {
          numero: nota.nNf,
          sacado: sacadoResponse.data.name,
          cedente: cedenteResponse.data.name,
          emissao: nota.emissionDate.split('T')[0],
          valor: (nota.value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          status: statusMap[nota.orderStatusBuyer]
        };
      }));

      return formattedNotas;
    }
  }
});
</script>

<style scoped>
.notas-fiscais-container {
  display: flex;
  background-color: #fbfdfe;
  width: 100%;
  overflow: hidden;
}

.sidebar {
  width: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  width: 100%;
  padding: 25px 24px;
}

.logo-image {
  width: 160px;
  max-width: 100%;
  aspect-ratio: 5.32;
  object-fit: contain;
}

.sidebar-nav {
  width: 100%;
  max-width: 288px;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  height: 64px;
  align-items: center;
  gap: 20px;
}

.nav-item.active .nav-indicator {
  background-color: #00ad8c;
  width: 4px;
  min-height: 64px;
  border-radius: 4px;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-icon {
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
}

.nav-text {
  color: #00ad8c;
  font: 500 14px DM Sans, sans-serif;
}

.main-content {
  width: 82%;
  border-radius: 15px 0 0 15px;
  box-shadow: 0 10px 30px 0 rgba(225, 229, 236, 0.5);
  background-color: #fff;
  padding: 40px 48px;
  font-family: DM Sans, sans-serif;
}

.page-header {
  margin-bottom: 19px;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 24px;
  color: #021b51;
  font-weight: 700;
  margin: 0;
}

.title-icon {
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
}

.page-description {
  color: #727d94;
  font-size: 14px;
  margin-top: 5px;
}

.table-section {
  font-size: 14px;
  color: #4d5566;
  font-weight: 500;
}

.table-header {
  display: flex;
  width: 81%;
  font-size: 12px;
  color: #a1a8b8;
  font-weight: 700;
  text-transform: uppercase;
  text-align: left;
  padding: 10px 30px;
}


.table-row {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 3px;
  margin-top: 16px;
  border-radius: 10px;
  border: 1px solid #ddd;
}



.nota-details {
  display: flex;
  flex: 0 0 80%;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  flex-grow: 1;
  padding: 10px 30px;
}



.nota-green {
  color: #00ad8c;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.details-button {
  border: 1px solid #ddd;
  border-radius: 24px;
  flex: 0 0 14%;
  font-size: 12px;
  color: #727d94;
  font-weight: 700;
  padding: 8px 29px;
  margin: 5px;
  background: none;
  cursor: pointer;
}

.row-item {
  flex: 1; 
  max-width: 16.66%; 
  text-align: left;
}

@media (max-width: 991px) {
  .notas-fiscais-container {
    flex-direction: column;
  }

  .sidebar,
  .main-content {
    width: 100%;
  }

  .main-content {
    padding: 40px 20px;
  }

  .table-header,
  .table-row {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
function mostrarFiltros() {
    var filtrosDiv = document.getElementById("filtros");
    filtrosDiv.style.display = (filtrosDiv.style.display === "none") ? "block" : "none";
  }
  
  function aplicarFiltros() {
    // Obter todas as checkboxes
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    
    // Filtrar apenas as checkboxes marcadas
    var categoriasSelecionadas = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.id);
  
    // Exibir as categorias selecionadas (pode ser ajustado conforme necessário)
    alert('Categorias Selecionadas: ' + categoriasSelecionadas.join(', '));
  }
  
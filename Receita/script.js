function saveRecipe() {
    // Recupera os valores dos campos
    const recipeName = document.getElementById('recipeName').value;
    const recipeDescription = document.getElementById('recipeDescription').value;
    const recipeImage = document.getElementById('recipeImage').value;
    const recipeDate = document.getElementById('recipeDate').value;

    // Cria um objeto com os dados da receita
    const recipeData = {
        name: recipeName,
        description: recipeDescription,
        image: recipeImage,
        date: recipeDate
    };

    // Envia os dados para o servidor usando AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_recipe.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Receita salva com sucesso!');
        } else {
            alert('Erro ao salvar a receita. Tente novamente mais tarde.');
        }
    };

    xhr.send(JSON.stringify(recipeData));

    // Limpa os campos do formulário
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeDescription').value = '';
    document.getElementById('recipeImage').value = '';
    document.getElementById('recipeDate').value = '';
}

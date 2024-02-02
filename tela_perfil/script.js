document.addEventListener('DOMContentLoaded', function () {
   
    const userData = {
      name: 'Maria',
      avatar: 'avatar.jpg',
      likeCount: 25,
      recipes: [
        'Bolo de Chocolate',
        'Salada de Frutas',
        'Macarrão Carbonara'
      ]
    };
  
  
    document.getElementById('userName').innerText = userData.name;
    document.getElementById('likeCount').innerText = `${userData.likeCount} Curtidas`;
  
    const avatarImage = document.querySelector('.profile-header img');
    avatarImage.src = userData.avatar;
  
    const recipeList = document.getElementById('recipeList');
    userData.recipes.forEach(recipe => {
      const listItem = document.createElement('li');
      listItem.innerText = recipe;
      recipeList.appendChild(listItem);
    });
  });
  
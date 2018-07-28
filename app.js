//Iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
      next: function () {
          return nextIndex < profiles.length ?
              { value: profiles[nextIndex++], done: false } :
              { done: true };
      }
  };
};

function nextProfile(profiles) {
    const currentProfile = profiles.next().value;

    if (currentProfile !== undefined) {
        document.getElementById('profile-display').innerHTML = `
            <ul class="list-group">
                <li class="list-group-item">Name: ${currentProfile.name}</li>
                <li class="list-group-item">Age: ${currentProfile.age}</li>
                <li class="list-group-item">Location: ${currentProfile.location}</li>
                <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingFor}</li>
            </ul>
        `;
        document.getElementById('image-display').innerHTML = `
            <img src="${currentProfile.image}">
        `;
    } else {
        window.location.reload();
    }
};
//FETCHING from API
fetch('https://randomuser.me/api/?results=5')
  .then(res=> res.json())
  .then(data=>{
    return data.results.map(user=>{ //Returns array of objects
       return {
        name: user.name.first,
        age: user.dob.age,
        location: user.location.city,
        gender: user.gender,
        image: user.picture.large
      }
    })
  })
  .then(users=>{ // Do smth with array of users
    const profiles = profileIterator(users);
    document.getElementById('next').addEventListener('click', ()=>nextProfile(profiles));

  })
  .catch(err => console.log(err))


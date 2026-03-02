console.log('Hey Developer')

function removeActive() {
    const btnActiveAll = document.getElementsByClassName('active')
    for (let btn of btnActiveAll) {
        btn.classList.remove('active')
    }
}

function loadCategories() {
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        //converts promise to json
        .then((res) => res.json())
        //send data to console
        .then((get) => displayCategories(get.
            categories)
        )
}

function loadVideos() {
    fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((respon) => respon.json())
        .then((data) => {

            const btnAll = document.getElementById('btn-all')

            removeActive()
            btnAll.classList.add('active')
            displayVideos(data.videos)
        })
}

function loadCatVideos(id) {
    const url = (`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const clickedBtn = document.getElementById(`btn-${id}`)
            removeActive()

            clickedBtn.classList.add("active")
            displayVideos(data.category)
        })
}

function loadVideoDetails(video_id) {
    const url = (`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDetl(data.video))

}

const displayVideoDetl = (video) => {
    const videoDetails = document.getElementById('video_details').showModal();
    const delContainer = document.getElementById('del-container')
    delContainer.innerHTML = `
    <div class="card bg-base-100   object-cover shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="details" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
    `
}

// category : "Music"
// category_id: "1001"

// {
//     "category_id": "1003",
//     "video_id": "aaai",
//     "thumbnail": "https://i.ibb.co/kc8CCFs/30-rock.png",
//     "title": "30 Rock",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/YZN9rQZ/tina.jpg",
//             "profile_name": "Tina Fey",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "4.5K",
//         "posted_date": "14800"
//     },
//     "description": "'30 Rock,' led by Tina Fey, is a comedy series that has garnered 4.5K views. The show is a witty and humorous take on the behind-the-scenes antics of a fictional live comedy show. With its sharp writing and unforgettable characters, '30 Rock' is perfect for fans of smart, satirical humor and engaging storylines."
// }

function displayCategories(categories) {
    //get the container
    const catagory = document.getElementById('catagory');
    // catagory.innerHTML = "";

    //loop
    for (let cat of categories) {
        const divCategory = document.createElement('div');
        divCategory.innerHTML = `
<button id="btn-${cat.category_id}" onclick="loadCatVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        //append child
        catagory.appendChild(divCategory);
    }

}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = '';

    if (videos.length == 0) {
        videoContainer.innerHTML = `
         <div class="col-span-full items-center justify-center flex flex-col text-center mt-10 py-[50px]">
            <img src="./design/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
        return;
    }

    videos.forEach(video => {
        console.log(video)
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
   <div class="card bg-base-100 ">
            <figure class="relative">
                <img class="w-full h-[200px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-sm text-white bg-black p-1 rounded">3hrs 56 min
                    ago</span>
            </figure>
            <div class=" flex gap-3 px-0  py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
               <div class="flex gap-2 ">
                <div class="intro ">
                    <h2 class="text-xl font-bold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img class="w-4 h-4"
                            src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></p>
                    <p class="text-sm text-gray-400">${video.others.views} Views</p>
                    </div>
                    <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-soft btn-primary btn-sm mx-autotext-sm  ">Show Details</button>
               </div>

            </div>
        </div>
    `;

        videoContainer.appendChild(videoCard);
    });
};


loadCategories();
loadVideos()
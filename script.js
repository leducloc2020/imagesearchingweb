const accessKey="ITjmxZwGPbQ5TzMjViUxyAMIWOotYBkL0I69uJnjo64";
const searchForm=document.querySelector("form");
const searchInput =document.querySelector(".search-input");
const imagesContainer=document.querySelector(".images-container");
const loadMoreBtn=document.querySelector(".loadMoreBtn");
let page=1;
//function to fletch using Unsplash API
const fetchImages= async (query, pageNo)=>{
    try {
    if(pageNo==1)
    {
        imagesContainer.innerHTML='';
    }
    imagesContainer.innerHTML='';
    //console.log(query);
    const url=`https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    const response= await fetch(url);
    const data= await response.json();
    console.log(data);
    if(data.results.length >0){

    

    data.results.forEach(photo =>{
        //creating image div
        const imageElement=document.createElement('div');
        imageElement.classList.add('imageDiv');
        imageElement.innerHTML= `<img src="${photo.urls.regular}"/>`;
       
        //creating overlay
        const overlayElement=document.createElement('div');
        overlayElement.classList.add('overlay');
        //creating overlay text
        const overlayImg=document.createElement('a');
        overlayImg.innerHTML=`<a href="${photo.links.html}" target="_blank">${photo.alt_description}</a>`;
        // const overlayText=document.createElement('h3');      
        //  overlayText.innerText=`${photo.alt_description}`;
        overlayElement.appendChild(overlayImg);
        // overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
        
    });
    if(data.total_pages==pageNo){
        loadMoreBtn.style.display="none";
    }
    else{
        loadMoreBtn.style.display="block";
    }
}
else{
    imagesContainer.innerHTML=` <h2>Không tìm thấy ảnh</h2>`
    if(loadMoreBtn.style.display=="block"){
        loadMoreBtn.style.display="none";
    }
}} 
catch (error) {
    imagesContainer.innerHTML=` <h2>Không tìm thấy ảnh.Vui lòng nhập lại</h2>`;
    if(loadMoreBtn.style.display=="block"){
        loadMoreBtn.style.display="none";
    }

}
    }

//Adding event Listener to search form//
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputText=searchInput.value.trim();
    // console.log(searchInput.value);
    if(inputText !=='')
    {
        page=1;
fetchImages(inputText, page);
    }
    else{
        imagesContainer.innerHTML=` <h2>Mời nhập yêu cầu</h2>`
    }

});
//adding event Listener to load more button
loadMoreBtn.addEventListener('click',()=>{
    fetchImages(searchInput.value.trim(),++page);
});
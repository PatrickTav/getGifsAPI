
const myKey = 'xdTzj5zvd7x7vTaIsE26qaW4FWqzawdZ'
const formSearch = document.querySelector('form')
const imageContainer = document.querySelector('div')

const getRequest = async value=> await
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${myKey}&limit=1&q=${value}`)
    .then(response => response.json())
    
const insertGifs = response =>{
    const GIFDataImage = response.data[0].images.downsized.url 
    const GIFTitle = response.data[0].title
    const img = document.createElement('img')

    img.setAttribute('src', GIFDataImage)
    img.setAttribute('alt', GIFTitle)
    imageContainer.insertAdjacentElement('afterbegin', img)
}
    
const tryError = async inputValue=>{
  const response = await getRequest(inputValue)
  
  try{
    if(!response.status === 200){
      throw new Error('Não foi possivel obter os dados ')
    }

    return insertGifs(response)
    
  }catch(error){
    alert(`erro: ${error.message}`)
  }
}

formSearch.addEventListener('submit', event=>{
  event.preventDefault()
  const inputValue = event.target.search.value
  tryError(inputValue)

  event.target.reset()
})



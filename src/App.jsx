import { useState } from 'react'
import './App.css'

function App() {
  const [infoData,setInfoData] = useState({name : "",product : "Poster",description:"",pic:"" ,price:"30000",haloPrice:"",orientation:"",colors:[],tags:[],categories:[],collections:[],halo:[]})

  const handleInputInfo= (event)=>{
    const {name, value} = event.target;
    setInfoData((prev)=>({
        ...prev,
      [name]: value
    }))

  }
  const onChangePicture = (event) => {
    if (event.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if(event.target.id == 'pic'){
        setInfoData((prev)=>({
          ...prev,
        pic : reader.result
        }))
       
    }
    else if (event.target.id == 'halo'){
      const prevValue = infoData.halo
      setInfoData((prev)=>({
        ...prev,
      halo: [...prevValue,[reader.result]]
    }))
    event.target.value=""  

    }
  });
      reader.readAsDataURL(event.target.files[0]);
    
     }
    
  };
    
    const handleInputKeyDown = async(event) => {
      if (event.key === ' ' && event.target.value.trim() !== '') {
        const prevValue = infoData[event.target.id]
        await setInfoData((prev)=>({
          ...prev,
        [event.target.id]: [...prevValue,[event.target.value]]
      }))
      event.target.value=""
      }
    };
  
    const handleTagDelete = (tagToDelete,id) => {
      const updatedTags = infoData[id].filter((tag) => tag !== tagToDelete);
      setInfoData((prev)=>({
        ...prev,
      [id]: updatedTags
    }));
    };
    const download = (event) => {
      event.preventDefault();
      
      const finalData = infoData
      finalData.name= finalData.name.split(' ')
      console.log(finalData)
      console.log(JSON.stringify(finalData))
      const blob = new Blob([JSON.stringify(finalData)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${infoData.name}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col" onSubmit={download}>


    <h3 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl  text-center '>Poster Upload</h3>
    
    <br />
    <label className='block mb-2 font-bold text-gray-600'>Name: <br />
    <input className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2" type="text" required name='name' value={infoData.name} onChange={handleInputInfo} /><br />
  </label><br />

  <label className='block mb-2 font-bold text-gray-600'>Product: <br />
      <input className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2" type="text" required name='product' value={infoData.product} onChange={handleInputInfo} /><br />
  </label><br />

  <label className='block mb-2 font-bold text-gray-600'>Description: <br />
      <input className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2" type="text" required name='description' value={infoData.description} onChange={handleInputInfo} /><br />
  </label><br />

  <label className='block mb-2 font-bold text-gray-600'>Price in cents: <br />
      <input className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2" placeholder="Price in Cents" type="text" required name='price' value={infoData.price} onChange={handleInputInfo} /><br />
  </label><br />


  <label className='block mb-2 font-bold text-gray-600'>Orientation: <br />
  <select className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2"  name ="orientation"value={infoData.orientation} onChange={handleInputInfo} > 
    <option value="horizontal" selected>Horizontal</option> 
    <option value="vertical">Vertical</option> </select>
  </label><br />

  <label className='block mb-2 font-bold text-gray-600'>Halo Price: <br />
      <input className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2" type="text"  name='haloPrice' value={infoData.haloPrice} onChange={handleInputInfo} /><br />
  </label><br />

  <label className='block mb-2 font-bold text-gray-600'>Colors: <br />
  <ul>
        {infoData.colors.map((tag, index) => (
          <li key={index} className="inline-block bg-gray-200 text-gray-600 rounded-full p-2 m-1">
            {tag}
            <button
              className="delete-button bg-transparent border-none text-gray-400 cursor-pointer ml-2"
              onClick={() => handleTagDelete(tag,'colors')}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        id="colors"
        required
        placeholder="Enter Colors"
        className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2 block mb-2 font-bold text-gray-600"
        onChange={handleInputKeyDown}
        onKeyDown={handleInputKeyDown}
      />
  </label><br />

  <label className='block mb-2 font-bold text-gray-600'>Tags: <br />
  <ul>
        {infoData.tags.map((tag, index) => (
          <li key={index} className="inline-block bg-gray-200 text-gray-600 rounded-full p-2 m-1">
            {tag}
            <button
              className="delete-button bg-transparent border-none text-gray-400 cursor-pointer ml-2"
              onClick={() => handleTagDelete(tag,'tags')}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        id="tags"
        required
        placeholder="Enter Tags"
        className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2 block mb-2 font-bold text-gray-600"
        onChange={handleInputKeyDown}
        onKeyDown={handleInputKeyDown}
      />
  </label><br />

  <label className='block mb-2 font-bold text-gray-600'>Categories: <br />
  <ul>
        {infoData.categories.map((tag, index) => (
          <li key={index} className="inline-block bg-gray-200 text-gray-600 rounded-full p-2 m-1">
            {tag}
            <button
              className="delete-button bg-transparent border-none text-gray-400 cursor-pointer ml-2"
              onClick={() => handleTagDelete(tag,'categories')}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <input
        required
        type="text"
        id="categories"
        placeholder="Enter Categories "
        className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2 block mb-2 font-bold text-gray-600"
        onChange={handleInputKeyDown}
        onKeyDown={handleInputKeyDown}
      />  </label><br />

  <label className='block mb-2 font-bold text-gray-600'>Collections: <br />
  <ul>
        {infoData.collections.map((tag, index) => (
          <li key={index} className="inline-block bg-gray-200 text-gray-600 rounded-full p-2 m-1">
            {tag}
            <button
              className="delete-button bg-transparent border-none text-gray-400 cursor-pointer ml-2"
              onClick={() => handleTagDelete(tag,'collections')}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        id="collections"
        required
        placeholder="Enter Categories "
        className="bg-white border border-gray-300 shadow p-3 w-full rounded mb-2 block mb-2 font-bold text-gray-600"
        onChange={handleInputKeyDown}
        onKeyDown={handleInputKeyDown}
      /></label><br />
    <label className='block mb-2 font-bold text-gray-600'> Poster Picture: <br /> 
    <img className= {"h-auto max-w-full rounded-lg ml-auto "} src={infoData.pic} />
    <br />       
    <input className= " text-sm text-gray-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700" 
    type='file' required accept="image/*" name="image" id="pic" onChange={onChangePicture} />
    </label>
    <label className='block mb-2 font-bold text-gray-600'>Halo Pictures: <br />
  <ul>
        {infoData.halo.map((tag, index) => (
          <li key={index} className="inline-block bg-gray-200 text-gray-600 rounded-full p-2 m-1">
            {<img src={tag} className= {"h-auto max-w-full rounded-lg ml-auto "} />}
            <button
              className="delete-button bg-transparent border-none text-gray-400 cursor-pointer ml-2"
              onClick={() => handleTagDelete(tag,'halo')}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <input
        type="file"
        id="halo"
        accept="image/*" 
        name="image"
        placeholder="Enter Halo Pics"
        className="text-sm text-gray-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
        onChange={onChangePicture}
      />
  </label><br />  
    
   
    <div className='flex flex-end justify-end'>
   <button className = {'text-sm text-gray-200 file:mr-5 bg-gray-700 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gray-700 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700'}  type="submit" >Save</button>
 </div>
  </form>

  
  
}
export default App




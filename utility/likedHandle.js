/* storage */

exports.likedHandle =  function (products,liked) {
// console.log(products,liked);
   if(products && liked){
       let temp=[]
       products.map(product=>{
       if( liked.includes(product._id))
       {product.isliked=true}
       temp.push(product)
       })
       return temp
   }
   else{
       return null
   }

}

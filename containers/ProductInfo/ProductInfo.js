import React from 'react';
import { StyleSheet, Text, View, RefreshControl, I18nManager, FlatList,Linking, ActivityIndicator,Switch,CheckBox, Button, Animated, Input, ScrollView, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground, Platform } from 'react-native';
import store from '../../store'
import { connect } from 'react-redux'
/* colors */
import colors from '../../colors'
/* padge */
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { setCart } from '../../actions/product'
import { Header } from 'react-navigation-stack';
/* toast */
// import Toast from 'react-native-simple-toast';
/* pagination */
/* circular menu */
import { FloatingMenu } from 'react-native-floating-action-menu';
import { faBars, faPhoneVolume, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



import Carousel from 'react-native-snap-carousel';

class ProductInfo extends React.Component {
     items = [
        { label: 'Call Us',    image: require('../../assets/icons/telephone.png') },
        { label: 'WhatsApp',    image: require('../../assets/icons/whatsapp.png') },
        { label: 'Facebook',    image: require('../../assets/icons/messenger.png') },
        // { label: this.state.mainCategory,    image: require('../../assets/icons/messenger.png') },
      ];
    state = {
        count: 0,
        counter: this.props.cartReducer.length,
        itemNumber: 0,
        data: [

        ],
        pics: [],
        currentItem:{},
        extraArray:[],
        initialItem:{},
        bottomBool:true,
        isMenuOpen: false,
        mainCategory:" ",
        category:" ",
        subcat:" ",
        mainCategoryObj:{},
        prodNontes: " ",
        extraLength:false,
        isClothes:false

    };


    static navigationOptions = { header: null }
    componentWillMount(){
        if(!this.props.navigation.state.params.item.extras){
            this.props.navigation.state.params.item.extras=[]
        }
    }
    componentDidMount() {
        this.props.navigation.state.params.item.extraArray=[]
        
        for (const ext of this.props.navigation.state.params.item.extras) {
            if(ext.ExtraPrice==0){
                this.setState({isClothes:true})
            }
        }
        this.setState({initialItem:this.props.navigation.state.params.item})
       
        this.props.navigation.state.params.item.extras.forEach(element => {
            element.checked=false
        });
        // if(!this.props.navigation.state.params.item.extras){
        //     this.setState({extraLength:false})
        // }
        // if (this.props.navigation.state.params.item.extras.length!=0) {
        //     this.setState({extraLength:true})
            
        // }
        this.getCAtegoryData()
        this.setState({currentItem:this.props.navigation.state.params.item})
        //  && 
        
        // console.log(this.props.navigation.state.params.item.extras);

        this.unsubscribe = store.subscribe(() => {
            this.setState({ counter: store.getState().cartReducer.length })
            // console.log(store.getState());

        });
        this.setState({ pics: this.props.navigation.state.params.item.images })
        

    }
    navigateMainCategory(title, props) {
        // console.log("////////////////////");
        // console.log(props.item._id);
    
        // this.props.navigation.navigate("MainCategory", { title, props })
    
      }
    
    componentWillUnmount() {
        this.unsubscribe();
        this.props.navigation.state.params.item=this.state.initialItem
        // console.log(this.state.initialItem);
    }
    getCAtegoryData(){
        // console.log(this.props.navigation.state.params.item);
        // console.log(this.props.categoryReducer);
        for (let indexMain = 0; indexMain < this.props.categoryReducer.length; indexMain++) {
            if(this.props.navigation.state.params.item.mainCategory==this.props.categoryReducer[indexMain]._id){
                this.setState({mainCategoryObj:this.props.categoryReducer[indexMain]})
                this.setState({mainCategory:I18nManager.isRTL ?this.props.categoryReducer[indexMain].nameAR: this.props.categoryReducer[indexMain].nameEN})
                for (let indexCat = 0; indexCat < this.props.categoryReducer[indexMain].Catygory.length; indexCat++) {
                    if(this.props.navigation.state.params.item.category==this.props.categoryReducer[indexMain].Catygory[indexCat]._id){
                        this.setState({category:I18nManager.isRTL ? this.props.categoryReducer[indexMain].Catygory[indexCat].nameAR : this.props.categoryReducer[indexMain].Catygory[indexCat].nameEN})

                        for (let indexSubCat = 0; indexSubCat < this.props.categoryReducer[indexMain].Catygory[indexCat].subCategory.length; indexSubCat++) {


                            if(this.props.navigation.state.params.item.subCatygory==this.props.categoryReducer[indexMain].Catygory[indexCat].subCategory[indexSubCat]._id){
                                this.setState({subcat:I18nManager.isRTL ? this.props.categoryReducer[indexMain].Catygory[indexCat].subCategory[indexSubCat].nameAR : this.props.categoryReducer[indexMain].Catygory[indexCat].subCategory[indexSubCat].nameEN})

                     
                            }
                        }
                    }
                }
            }
            
        }
        // console.log(this.props.navigation.state.params.item);
    }
    increase = () => {
        this.setState({ count: ++this.state.count })
    }
    decrease = () => {
        if (this.state.count > 0) {
            this.setState({ count: --this.state.count })
        }
    }
    submitItem = () => {
        // console.log("----------------product info submit-------------");
        // console.log(this.state.currentItem);
        
        if (this.state.count > 0) {
            // Toast.show(`${this.props.navigation.state.params.item.productNameEN} added to cart`);
            this.props.setCart({
                item: this.state.currentItem, count: this.state.count,prodNontes:this.state.prodNontes
            })
            this.props.navigation.goBack()

        }
        else {
            // Toast.show("Add Quantity");
        }
        // let temp =[]
        // let itemCopy=this.state.currentItem
   
        
        

    }
    toggleExtras(item,index){
    
        let temp=[]
        temp=[...this.state.extraArray]
        let recipe = JSON.parse(JSON.stringify(this.state.currentItem))
     

            recipe.extras[index].checked=!recipe.extras[index].checked
            // console.log(recipe.extras[index].checked);
            this.setState({
                currentItem:recipe
              },()=>{
                if(this.state.currentItem.extras[index].checked){
                    // this.setState({currentItem.discountPrice:})
                    // this.props.navigation.state.params.item.discountPrice+=this.props.navigation.state.params.item.extras[index].ExtraPrice
                    let recipesCopy = JSON.parse(JSON.stringify(this.state.currentItem))
                    recipesCopy.discountPrice+=this.props.navigation.state.params.item.extras[index].ExtraPrice
                   
                    temp.push(item.ExtraAR)
                        // console.log(temp);
                        this.setState({extraArray:temp},()=>{recipesCopy.extraArray=temp
                            this.setState({
                                currentItem:recipesCopy 
                              }) 
                            })
                }
                else{
                    // this.props.navigation.state.params.item.discountPrice-=this.props.navigation.state.params.item.extras[index].ExtraPrice
                    let recipes = JSON.parse(JSON.stringify(this.state.currentItem))
                    recipes.discountPrice-=this.props.navigation.state.params.item.extras[index].ExtraPrice
                    
                    temp = temp.filter(e => e !== item.ExtraAR);
                    // console.log(temp);
                    this.setState({extraArray:temp},()=>{recipes.extraArray=temp,
                        this.setState({
                        currentItem:recipes
                      }) 
                    })
                }
              }) 

        // this.setState({currentItem:this.props.navigation.state.params.item})
       
    //    console.log(item);
       }
       toggleBottom(bool){
this.setState({bottomBool:bool})
       }


       handleMenuToggle =  isMenuOpen =>{
    this.setState({ isMenuOpen});
// console.log("Sd");
}
 
  handleItemPress = (item, index) =>{
      switch(index){
          case 1:{ Linking.openURL('whatsapp://send?text=hello&phone=+201066311099')
        break;}
        case 2  :{ 
             let phoneNumber = '01066311099';
        console.log(phoneNumber);
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phoneNumber}`;
        }
        else {
            phoneNumber = `telprompt:${phoneNumber}`;
        }

        Linking.openURL(phoneNumber);
        break;}
        case 0:{ 
            Linking.openURL("fb-messenger://user-thread/" + "109946370745674");
            break;}
      }
  }

    renderItemIcon = (item, index, menuState) => {
        const { itemsDown, dimmerActive } = menuState;
     
        const isItemPressed = itemsDown[index];
        const color = isItemPressed ? '#fff' : colors.primary;
     
        // Icons can be rendered however you like.
        // Here are some examples, using data from the item object:
     
        if (item.fa) {
          return (
            <FontAwesomeIcon
              icon={item.fa}
              size={25}
              color={color}
            />
          );
        }
        else if (item.image) {
          return (
            <Image
              source={item.image}
              style={{ resizeMode:'contain',width:"100%" }}
              resizeMode='contain'
            />
          );
        }
     
        return null;
      };
      renderMenuIcon = (menuState) => {
        const { menuButtonDown } = menuState;
     
        return menuButtonDown
          ? <Image style={{ resizeMode:'contain',width:"150%" }} source={require('../../assets/icons/support.png')} />
          : <Image style={{ resizeMode:'contain',width:"150%" }} source={require('../../assets/icons/support.png')} />;
      }
      _handleSubject(prodNontes) {
        this.setState({ prodNontes })
    
      }
    render() {
        return (
            <View style={styles.container}>
                  <FloatingMenu
          isOpen={this.state.isMenuOpen}
          items={this.items}
          onMenuToggle={this.handleMenuToggle}
          onItemPress={this.handleItemPress}
          renderItemIcon ={this.renderItemIcon }
          borderColor={colors.white}
          backgroundUpColor={colors.white}
          renderMenuIcon ={this.renderMenuIcon}
          position="top-right" 
          top={70}
        />
                <View style={styles.headerContainer}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Image
                                source={require('../../assets/icons/back.png')}
                                style={{
                                    width: Dimensions.get('window').width * 10 * 1.2 / 375,
                                    height: Dimensions.get('window').height * 18 * 1.2 / 812,


                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            fontFamily: 'Cairo-Regular',
                            fontSize: 20,
                        }}>{I18nManager.isRTL ? "المنتج" : "Product Info"}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30, width: "70%" }}
                            onPress={() => { this.props.navigation.navigate("Cart") }}>
                            <Image source={require("../../assets/icons/cart.png")}
                                style={styles.cartImageStyle} />
                            {this.state.counter > 0 ? (<Badge
                                value={this.state.counter}
                                status="error"
                                badgeStyle={{ backgroundColor: colors.badge }}
                                containerStyle={{ position: 'relative', top: 10, right: 10 }}
                                textStyle={{ fontFamily: 'Cairo-Bold', fontSize: 12, margin: -3 }}
                            />) : null}
                        </TouchableOpacity>
                    </View>

                </View>
              
                <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.scroll} style={styles.scroll}  showsVerticalScrollIndicator={false}>
                    
                    {/* <View style={[styles.detailsContainer, { backgroundColor: 'green' }]}> */}

                    {(!(this.props.navigation.state.params.item.discount === 0)) && <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{this.props.navigation.state.params.item.discount} %</Text>
                    </View>}
                    {/* {( !(data.src.discount === 0)) && <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>-{data.src.discount}</Text>
                </View>} */}

                    <View style={styles.likeBadge}>
                    
                        {/* {this.props.navigation.state.params.item.isliked ?
                            <Image source={require("../../assets/icons/heart-red.png")}
                                style={styles.heartImage} /> :
                            <Image source={require("../../assets/icons/heart.png")}
                                style={styles.heartImage} />} */}
                        {/* <Text>{this.props.navigation.state.params.item.likes}</Text> */}
               
                    </View>
                   
                    {/* <Image
                        source={{ uri: this.props.navigation.state.params.item.uri }}
                        source={{ uri: `http://www.beemallshop.com/img/productImages/${this.props.navigation.state.params.item.images[0]}` }}
                        style={styles.productImage} /> */}
                    <View
                        style={{ height: Dimensions.get('window').height * 300 / 812, }}
                        style={{ height: Dimensions.get('window').height * 280 / 812, }}

                    >
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.state.pics}
                            renderItem={(item) => (
                                <Image
                                    source={{ uri: `http://www.beemallshop.com/img/productImages/${item.item}` }}
                                    style={styles.productImage} />
                            )}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width * 250 / 375}
                            onSnapToItem={(index) => { this.setState({ index }); }}
                            initialNumToRender={this.state.pics.length}
                            useScrollView

                        />
                    </View>
                    {/* <TouchableOpacity style={styles.rateButton}>
                        <Text style={styles.rateFont}>{I18nManager.isRTL ? "تقييم المنتج" : "Rate Product"}</Text>
                    </TouchableOpacity> */}
                    <View style={styles.productQntyContainer}>
                        <View style={styles.productTitle}>

                            <Text style={{ fontFamily: "Cairo-Regular", fontSize: 15, textAlign: I18nManager.isRTL ? 'left' : null }}>{I18nManager.isRTL ? this.props.navigation.state.params.item.productNameAR : this.props.navigation.state.params.item.productNameEN}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={{ fontFamily: "Cairo-Bold", fontSize: 18, color: colors.gold }}>{I18nManager.isRTL ? "ج.م" : "EGP"} {Number.parseFloat(this.state.currentItem.discountPrice).toFixed(2)}</Text>
                                {(!(this.props.navigation.state.params.item.discount === 0)) && <View style={styles.dicountContainer}>
                                    <Text style={styles.discount}>{this.props.navigation.state.params.item.price}</Text>
                                </View>}
                            </View>
                        </View>
                        <View style={styles.productQnty}>

                            <Text style={{ fontFamily: "Cairo-Regular", fontSize: 14 }}>{I18nManager.isRTL ? "الكمية" : "Quantity"}</Text>
                            <View style={{ flexDirection: 'row', width: "100%", flex: 1, justifyContent: 'center' }}>
                                <View style={styles.increamentContainer}>
                                    <TouchableOpacity style={styles.plusOrMinus} onPress={this.decrease}>
                                        <Image source={require("../../assets/icons/minus.png")}
                                            style={styles.plusMinusIcon} />
                                    </TouchableOpacity>
                                    <View style={styles.required}>
                                        <Text style={{ fontFamily: "Cairo-Bold", fontSize: 16 }}>{this.state.count}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.plusOrMinus} onPress={this.increase}>
                                        <Image source={require("../../assets/icons/plus.png")}
                                            style={styles.plusMinusIcon} />
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <View style={styles.productDetailsTitle}>
                             {  this.props.navigation.state.params.item.extras.length!=0&&<TouchableOpacity style={{flex:1, justifyContent:'center',alignItems:'center'}} onPress={()=>{this.toggleBottom(false)}}>
                               
                        <Text style={{padding:5,paddingHorizontal:15,borderRadius:30,backgroundColor:colors.primary, fontFamily: "Cairo-Bold", fontSize: 16, textAlign: I18nManager.isRTL ? 'left' : null }}>{I18nManager.isRTL ? this.state.isClothes?"المقاسات":"اضافات" : this.state.isClothes?"Sizes":"Extras"}</Text>
                        </TouchableOpacity>}
                        <TouchableOpacity style={{flex:1, justifyContent:'center',alignItems:'center'}} onPress={()=>{this.toggleBottom(true)}}>
                            <Text style={{padding:5,paddingHorizontal:15, borderRadius:30, backgroundColor:colors.primary, fontFamily: "Cairo-Bold", fontSize: 16, textAlign: I18nManager.isRTL ? 'left' : null }}>{I18nManager.isRTL ? "تفاصيل المنتج" : "Product Details"}</Text>
                            </TouchableOpacity>
                        </View>
                       { this.state.bottomBool?
                        <View style={styles.flatListContainer}>
                            <TouchableOpacity>
                                <Text style={{fontFamily:'Cairo-Bold'}}>{this.state.mainCategory}  {this.state.category}  {this.state.subcat}</Text>
                            </TouchableOpacity>
                            <FlatList
                            persistentScrollbar={true}
                                // showsVerticalScrollIndicator={false}
                                // contentContainerStyle={styles.grid}
                                data={I18nManager.isRTL ? this.props.navigation.state.params.item.detailAR : this.props.navigation.state.params.item.detailEN}
                                renderItem={({ item }) => (

                                    <Text style={{ flex: 1, padding: 5,marginHorizontal:5, fontFamily: 'Cairo-SemiBold', textAlign: (I18nManager.isRTL && Platform.OS == 'ios') ? 'left' : null }}>{item}</Text>
                                )}
                                style={{ width: '100%', }}
                                horizontal={false}
                                numColumns={1}
                            ></FlatList>
                             <View style={styles.yellowContainerMessage}>

                                        <View style={styles.iconView}>
                                        <Image source={require("../../assets/icons/subject.png")}
                                            style={styles.imageStyleNote} />
                                        </View>
                                        <View style={styles.textInputView}>
                                        <TextInput
                                            style={styles.textInputStyleM}
                                            placeholder={I18nManager.isRTL ? "ملاحظات" : "Notes"}
                                            value={this.state.phonenumber}
                                            placeholderTextColor={'#ccc'}
                                            width={Dimensions.get('window').width * 3 / 5}

                                            autoCapitalize='none'
                                            onChangeText={(text) => this._handleSubject(text)}
                                        />
                                        </View>
                                </View>
                            
                          
                        </View>
                        
                        :
                        <View style={styles.flatListContainer}>

                        <FlatList
                                showsVerticalScrollIndicator={false}
                                // contentContainerStyle={styles.grid}
                                data={ this.state.currentItem.extras}
                                renderItem={({ item ,index}) => 
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <TouchableOpacity style={{backgroundColor:item.checked?'green':'red',height:22,width:22,borderRadius:18}} onPress={()=>{this.toggleExtras(item,index)}}>
                                {/* <Image source={
                                   item.checked? require("../../assets/icons/plus.png")}
                                            style={styles.addRemove} /> */}
                                </TouchableOpacity>
                                <Text style={{ flex: 6, padding: 5,fontSize:18, fontFamily: 'Cairo-SemiBold', textAlign: (I18nManager.isRTL && Platform.OS == 'ios') ? 'left' : null }}>{I18nManager.isRTL ? item.ExtraAR :item.ExtraEn}</Text>
                                    {item.ExtraPrice!=0 &&<Text style={{ flex: 2, padding: 5,fontSize:18,color:colors.gold, fontFamily: 'Cairo-SemiBold', textAlign: (I18nManager.isRTL && Platform.OS == 'ios') ? 'left' : null }}>{item.ExtraPrice}</Text>}
                                </View>
                                     }
                                style={{ width: '100%', }}
                                horizontal={false}
                                numColumns={1}
                            ></FlatList>
                        </View>
                        }

                    </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.addToCart}
                        onPress={this.submitItem}
                    >
                        <Text style={{ fontFamily: "Cairo-Bold", fontSize: 16, }}>  {I18nManager.isRTL ? "إضافة الي السلة" : "Add To Cart"}  </Text>
                        <Image source={require("../../assets/icons/cartIn.png")}
                            style={styles.cartIcon} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartImageStyle: {
        width: 37,
        height: 39,
        resizeMode: "contain",
    },
    mainContainer: {
        width: '100%',
        height: '89%',
        backgroundColor: colors.white,
        alignItems: 'center',
        // justifyContent: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        paddingBottom: 0

    },
    detailsContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.white,
        alignItems: 'center',
        // justifyContent: 'center',

        padding: 0
    },
    discountBadge: {
        backgroundColor: colors.red,
        width: "19%",
        height: "5%",
        position: 'absolute',
        right: 20,
        top: 20,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    likeBadge: {
        width: "17%",
        height: "4%",
        position: 'absolute',
        left: 10,
        top: 20,

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    discountText: {
        fontFamily: 'Cairo-Bold',
        fontSize: 14,
        color: colors.white
    },

    heartImage: {
        resizeMode: "contain",
        height: 30

    },
    productImage: {
        // width: Dimensions.get('window').width * 9 / 20,
        width: Dimensions.get('window').width * 250 / 375,
        height: Dimensions.get('window').height * 245 / 812,
        // height: '30.1%',
        resizeMode: "contain",
        marginTop: 20,
        // backgroundColor:'blue'
    },
    rateButton: {
        width: Dimensions.get('window').width * 117 / 375,
        height: Dimensions.get('window').height * 29 / 812,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Dimensions.get('window').height * 5 / 812,
        borderRadius: 15
    },
    rateFont: {
        fontSize: 14,
        fontFamily: "Cairo-Regular"
    },
    productQntyContainer: {
        // height: Dimensions.get('window').height * 80 / 812,
        width: Dimensions.get('window').width,
        marginTop: Dimensions.get('window').height * 30 / 812,
        flexDirection: "row",
        paddingHorizontal: 20,
        marginBottom: 5,
        // backgroundColor:'red'
    },
    productTitle: {
        flex: 1,
        // backgroundColor:'blue'
    }
    , productQnty: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor:'green'

    },
    priceContainer: {
        flexDirection: 'row',

    },
    dicountContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'center'
    },
    increamentContainer: {
        flexDirection: 'row',
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        height: 45,
        // backgroundColor:'blue'
    },
    plusOrMinus: {
        justifyContent: 'center',
        padding: 15,
        backgroundColor: colors.primary,
        borderRadius: 7

    },
    plusMinusIcon: {
        resizeMode: "contain",
        height: 15,
        width: 10

    },
    addRemove: {
        resizeMode: "contain",
        height: 15,
        width: 10,
        backgroundColor:colors.primary,
        padding:10,
        marginHorizontal:10
        

    },
     required: {
        justifyContent: 'center',
        width: "40%",
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: colors.fade,

        borderRadius: 7
    },
    addToCart: {
        height: Dimensions.get('window').height * 58 / 812,
        width: Dimensions.get('window').width,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    productDetails: {
        backgroundColor: colors.fade,
        flex: 5,
        width: Dimensions.get('window').width,
        marginTop:10
    },
    productDetailsTitle: {

        paddingLeft: Dimensions.get('window').width * 16 / 375,
        paddingTop: Dimensions.get('window').height * 14 / 812,
        flexDirection:'row'
    },
    flatListContainer: {
        marginHorizontal: 10,
        flex: 1,
    },
    cartIcon: {
        resizeMode: "contain",
        width: 25,
        marginLeft: 10

    },
    discount: {
        fontFamily: 'Cairo-Regular',
        fontSize: 12,
        textDecorationLine: 'line-through',
        textDecorationStyle: "solid",
        textDecorationColor: "red",
        marginRight: 30
    },
    headerContainer: {
        width: Dimensions.get('window').width,
        height: "11%",
        backgroundColor: colors.primary,
        alignContent: "center", justifyContent: 'center',
        flexDirection: 'row'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
      scroll:{
        width: Dimensions.get('window').width,
        // flex:1,
        // backgroundColor:'red'
        // height:"100%"
        flexGrow:1
      },
      yellowContainerMessage: {
          marginBottom:20,
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 35,
        width: Dimensions.get('window').width * 343 / 375,
        height: Dimensions.get('window').height * 220 / 812,
        marginTop: Dimensions.get('window').height * 30 / 812,
        // paddingVertical: Dimensions.get('window').height * 20 / 812,
      },
      iconView: {
        borderTopLeftRadius: I18nManager.isRTL ? 0 : 35,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        borderTopRightRadius: I18nManager.isRTL ? 35 : 0,
        // I18nManager.isRTL
        alignItems: 'center',
        justifyContent: 'center',
    
        backgroundColor: '#FFF064',
        width: Dimensions.get('window').width * 54 / 375,
        height: Dimensions.get('window').height * 46 / 812,
    
      },
      textInputViewM: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width * (343 - 54) / 375,
        height: Dimensions.get('window').height * 220 / 812,
        padding: 10
      },
    
      textInputStyleM: {
        fontFamily: 'Cairo-Bold',
        width: Dimensions.get('window').width * (343 - 54) / 375,
        textAlign: I18nManager.isRTL && Platform.OS === "ios" ? 'right' : null,
        height: Dimensions.get('window').height * 180 / 812,
      },imageStyleNote: {
        width: 10,
        height: 10,
        padding: 10,
        resizeMode: "contain"
      },

});
const mapStateToProps = state => ({
    www: state.www,
    cartReducer: state.cartReducer,
    categoryReducer: state.categoryReducer,
})
const mapDispatchToProps = {
    setCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo)
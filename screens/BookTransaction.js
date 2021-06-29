import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,TextInput,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TranscationScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned:false,
           // scannedData:'',
            scannedBookId:'',
            scannedStudentId:'',
            buttonState:'normal'

        }
    }
    getCameraPermissions=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:id,
            scanned:false
        })

    }
    handleScannedData=async({type,data})=>{
        const {buttonState}=this.state
        if (buttonState==="BookId"){
            this.setState({
                scannedBookId:data,
                buttonState:'normal',
                scanned:true
            })
        }
        else if (buttonState==="StudentId"){
            this.setState({
                scannedStudentId:data,
                buttonState:'normal',
                scanned:true
            })
        }
        
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if (buttonState!== "normal" && hasCameraPermissions){
        return(
            <BarCodeScanner
            onBarCodeScanned={
                scanned ? undefined : this.handleScannedData
            }
            style={StyleSheet.absoluteFillObject}
            />
        )
        }
        else if (buttonState==="normal"){
            return(
            <View>
                <View>
                    <Image
                    source={require('../assets/bookl.jpg')}
                    style={{width:200,height:200}}/>
                    <Text style={{textAlign:'center',fontSize:30}}>
                        Wily
                    </Text>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.inputBox}
                    placeholder="Student id"
                    value={this.state.scannedStudentId}>
                    </TextInput>
                    <TouchableOpacity style={styles.scanButton}
                    onPress={this.getCameraPermissions("StudentId")}>
                        <Text style={styles.scanButtonText}>
                        Scan 
                        </Text>
                       
                    </TouchableOpacity>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputBox}
                    placeholder="Book Id"
                    value={this.state.scannedBookId}>

                    </TextInput>
                    <TouchableOpacity style={styles.scanButton}
                    onPress={this.getCameraPermissions("BookId")}>
                        <Text style={styles.scanButtonText}>
                            Scan
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            )
        }
        
    }
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scanButton:{
        
        backgroundColor:"#66BB6A",
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0,
    },
    scanButtonText:{
       // color:"red",
       // textDecorationLine:'underline',
        fontSize:15,
        textAlign:'center',
        marginTop:10
    },
    displayText:{
        fontSize:30,
        textDecorationLine:'underline',
        color:"green"
    },
    inputView:{
        flexDirection:'row',
        margin:20
    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20
    }
  });
  
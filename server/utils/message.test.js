var expect =require('expect')
var { generateLocationMessage ,generateLocationMessage } = require('./message')

var generateMessage =require('./message')

describe("Generate Message" ,() =>{
    it('should generate correct message object' ,() =>{
        var from = 'abolfazl',
        var text = 'Test Message',
        var message =generateMessage(from , text);

        expect(typeof message,createAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({from , text}))

    })
})

discribe('Generate Location Message' , () =>{
    it('Sould generate coorect location object' , ()=>{
        var from ='Abolfazl';
        var latiude = 15 ;
        var longitude = 39 ;
        var url ='http://www.google.com/maps?q=15,39';
        var message = generateLocationMessage(from, latiude , longitude)
        
        
        expect(typeof message.createAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({from , url}))
    })
})
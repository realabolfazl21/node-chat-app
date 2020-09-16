var expect =require('expect')

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
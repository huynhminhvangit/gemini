require('dotenv').config()
const { GoogleGenerativeAI } = require('@google/generative-ai')
const fs = require('fs')

const generativeAI = new GoogleGenerativeAI(process.env.API_KEY)

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString('base64'),
            mimeType
        }
    }
}

async function run() {
    const model = generativeAI.getGenerativeModel({ model: 'gemini-pro-vision' })

    const prompt = "Please take out all the holidays and format to dd-mm-yyyy in the picture?"

    const imagePaths = [
        fileToGenerativePart('holidays.png', 'image/png'),
    ]

    const result = await model.generateContent([prompt, ...imagePaths])

    const response = await result.response

    const text = response.text()

    console.log(text)
}

run()
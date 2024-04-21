const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe("testing VinoMania", () => {
    describe("Test de autenticación de usuario", () => {
        it("El endpoint POST /api/auth debe autenticar al usuario correctamente", async () => {
            const userMock = {
                email: "ADMIN@VINOMANIA.COM",
                password: "admin1234"
            }

            const authResponse = await requester
                .post("/api/auth")
                .send(userMock)

            console.log("Autenticación:", authResponse.statusCode, authResponse.ok, authResponse.body)
            expect(authResponse.statusCode).to.equal(200)
        })
    })

describe("Test de creación de producto", () => {
    it("El endpoint POST /api/products debe crear un producto correctamente", async () => {

        const productMock = {
            title: 'pruebaTest',
            description: 'Producto de prueba para los Test',
            price: 100,
            thumbnail: 'img prueba test',
            code: 'pruebaTest',
            stock: 100,
            status: true,
            category: 'pruebaTest',
        }

        const productResponse = await requester
            .post("/api/products")
            .send(productMock)

        console.log("Creación de producto:", productResponse.statusCode, productResponse.ok, productResponse.body)
        expect(productResponse.statusCode).to.equal(201)

    })
})

describe("Test de eliminacion del producto", () => {
    it("El endpoint DELETE /api/products debe eliminar un producto cambiando el status a false", async () => {

        // id del producto que quieres borrar 
        const productId = "65adcb70c08b1d900c52c9e8"

        const deleteResponse = await requester
            .delete(`/api/products/${productId}`)

        console.log("Eliminacion de un producto:", deleteResponse.statusCode, deleteResponse.ok, deleteResponse.body)
        expect(deleteResponse.body.status).to.equal(false)
    })
})

describe("Test de creación de carrito", () => {
    it("debería crear un carrito correctamente", async () => {
        const CartResponse = await requester.post("/api/carts")
        console.log("Creación del carrito:", CartResponse.statusCode, CartResponse.ok, CartResponse.body)

        expect(CartResponse.status).to.equal(201)
        expect(CartResponse.body).to.have.property("message", "Carrito creado correctamente")
        expect(CartResponse.body).to.have.property("cid").that.is.a("string") // Verifica si cid es un string
    })
})

})

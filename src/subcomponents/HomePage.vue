<template>
    <div class="container fixed">
        <div class="info">
            <h1>SIMS</h1>
            <p>Welcome to the Student Information Management System (SIMS). Your comprehensive solution for efficient
                student data management and academic administration.</p>
            <p>Empower your educational institution with cutting-edge technology and streamlined processes.</p>
            <div class="btn mb-20">
            </div>
        </div>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
    text-decoration: none;
}

.container {
    max-width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url('/public/images/background.jpg');
    background-size: cover;
    background-position: center;
}

.info {
    text-align: center;
    width: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #aaa;
    margin-left: 20%;
    border-radius: 10px;
    padding: 8px;
}

.info h1 {
    color: #fff;
    font-family: lato;
    font-size: 60px;
    color: #2D3250;

}

.info p {
    color: #fff;
    font-size: 20px;
    font-family: arial;
    margin: 30px 0px;
    color: #2D3250;
}
</style>

<script>
export default {
    data() {
        return {}
    }
}
</script>
<script setup>

</script>

<template>
<section>

  <article class="row m-0 p-0 mb-3">
    <div class="col-2 d-flex p-2 justify-content-center text-center">
      <div class="progress-bar-container w-100">
        <h4 class="fw-semibold">
          <label for="python">Python</label>
        </h4>
        <div class="progress-bar python m-auto">
          <progress id="python" min="0" max="100" value="85"></progress>
        </div>
        </div>
    </div>
    <div class="col-2 d-flex p-2 justify-content-center text-center">
      <div class="progress-bar-container w-100">
        <h4 class="fw-semibold">
          <label for="js">JavaScript</label>
        </h4>
        <div class="progress-bar js m-auto">
          <progress id="js" min="0" max="100" value="50"></progress>
        </div>
        </div>
    </div>

    <div class="col-2 d-flex p-2 justify-content-center text-center">
      <div class="progress-bar-container w-100">
        <h4 class="fw-semibold">
          <label for="css">Css</label>
        </h4>
        <div class="progress-bar css m-auto">
          <progress id="css" min="0" max="100" value="10"></progress>
        </div>
        </div>
    </div>
    <div class="col-2 d-flex p-2 justify-content-center text-center">
      <div class="progress-bar-container w-100">
        <h4 class="fw-semibold">
          <label for="html">HTML</label>
        </h4>
        <div class="progress-bar html m-auto">
          <progress id="html" min="0" max="100" value="50"></progress>
        </div>
        </div>
    </div>
  </article>
  <hr>
  <article class="row m-0 p-0 mb-3">
    <div class="col-2 d-flex p-2 justify-content-center text-center">
      <div class="progress-bar-container w-100">
        <h4 class="fw-semibold">
          <label for="webfb">WEB F&B</label>
        </h4>
        <div class="progress-bar webfb m-auto">
          <progress id="webfb" min="0" max="100" value="60"></progress>
        </div>
      </div>
    </div>
    <div class="col-2 d-flex p-2 justify-content-center text-center">
      <div class="progress-bar-container w-100">
        <h4 class="fw-semibold">
          <label for="mobil">Mobil</label>
        </h4>
        <div class="progress-bar mobil m-auto">
          <progress id="mobil" min="0" max="100" value="20"></progress>
        </div>
      </div>
    </div>

    <div class="col-2 d-flex p-2 justify-content-center text-center">
      <div class="progress-bar-container w-100">
        <h4 class="fw-semibold">
          <label for="css">Css</label>
        </h4>
        <div class="progress-bar css m-auto">
          <progress id="css" min="0" max="100" value="10"></progress>
        </div>
      </div>
    </div>
    <div class="col-2 d-flex p-2 justify-content-center text-center">
      <div class="progress-bar-container w-100">
        <h4 class="fw-semibold">
          <label for="html">HTML</label>
        </h4>
        <div class="progress-bar html m-auto">
          <progress id="html" min="0" max="100" value="50"></progress>
        </div>
      </div>
    </div>
  </article>
</section>
</template>

<style scoped lang="scss">
@property --progress-value {
  syntax: '<integer>';
  inherits: false;
  initial-value: 0;
}

@keyframes html-progress {
  to { --progress-value: 40; }
}

@keyframes css-progress {
  to { --progress-value: 10; }
}

@keyframes python-progress {
  to { --progress-value: 85; }
}
@keyframes js-progress {
  to { --progress-value: 50; }
}
@keyframes webfb-progress {
  to { --progress-value: 60; }
}
@keyframes mobil-progress {
  to { --progress-value: 20; }
}

.progress-bar {
  width: 100px;
  height: 100px;
  border-radius: 50%;

  /* to center the percentage value */
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-bar::before {
  counter-reset: percentage var(--progress-value);
  content: counter(percentage) '%';
}

.html {
  background:
      radial-gradient(closest-side, var(--bs-dark) 75%, transparent 80% 100%, white 0),
      conic-gradient(var(--bs-info) calc(var(--progress-value) * 1%), var(--bs-info-bg-subtle) 0);
  animation: html-progress 2s 1 forwards;
}

.html::before {
  animation: html-progress 2s 1 forwards;
}

.webfb {
  background:
      radial-gradient(closest-side, var(--bs-dark) 75%, transparent 80% 100%, white 0),
      conic-gradient(var(--bs-info) calc(var(--progress-value) * 1%), var(--bs-info-bg-subtle) 0);
  animation: webfb-progress 2s 1 forwards;
}

.webfb::before {
  animation: webfb-progress 2s 1 forwards;
}
.mobil {
  background:
      radial-gradient(closest-side, var(--bs-dark) 75%, transparent 80% 100%, white 0),
      conic-gradient(var(--bs-info) calc(var(--progress-value) * 1%), var(--bs-info-bg-subtle) 0);
  animation: mobil-progress 1s 1 forwards;
}

.mobil::before {
  animation: mobil-progress 1s 1 forwards;
}

.css {
  background:
      radial-gradient(closest-side, var(--bs-dark) 75%, transparent 80% 100%, white 0),
      conic-gradient(var(--bs-info) calc(var(--progress-value) * 1%), var(--bs-info-bg-subtle) 0);
  animation: css-progress 1s 1 forwards;
}

.css::before {
  animation: css-progress 1s 1 forwards;
}

.python {
  background:
      radial-gradient(closest-side, var(--bs-dark) 75%, transparent 80% 100%, white 0),
      conic-gradient(var(--bs-info) calc(var(--progress-value) * 1%), var(--bs-info-bg-subtle) 0);
  animation: python-progress 2s 1 forwards;
}

.python::before {
  animation: python-progress 2s 1 forwards;
}

.js {
  background:
      radial-gradient(closest-side, var(--bs-dark) 75%, transparent 80% 100%, white 0),
      conic-gradient(var(--bs-info) calc(var(--progress-value) * 1%), var(--bs-info-bg-subtle) 0);
  animation: js-progress 2s 1 forwards;
}

.js::before {
  animation: js-progress 2s 1 forwards;
}

body {
  font-family: -apple-system, system-ui, Helvetica, Arial, sans-serif;
  margin: 30px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  max-width: 600px;
}

h2 {
  text-align: center;
}

progress {
  visibility: hidden;
  width: 0;
  height: 0;
}
</style>

<template>
<section class="cta-section theme-bg-light py-5">
    <div class="container text-center single-col-max-width">
        <h2 class="heading mb-3">Online Resume</h2>
        <button class="btn btn-primary" @click="generatePDF"><i class="fas fa-file-pdf me-2"></i>Download PDF Version</button>
    </div><!--//container-->
</section>
<section class="w-100 d-flex">
    <article class="justify-content-center m-auto">
        <ResumeComponent id="resume" :context="context" :EditMode="false"/>
    </article><!--//container-->
</section>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';
import ResumeComponent from '@/components/ResumeComponent.vue'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const context = ref()


async function get_context() {
    const response = await axios.get('resume/')
    context.value = response.data
}


onMounted(get_context)


function generatePDF() {
  const currentDate = new Date().toISOString().slice(0, 10);
  const filename = `farukseker-online-resume_${currentDate}.pdf`; 

  const A4_WIDTH = 1424; // px
  //shadow-lg
  
  const resume = document.querySelector("#resume")
  resume.classList.remove('px-3')
  resume.classList.remove('px-lg-5')
  resume.firstChild.classList.remove('shadow-lg')

  html2canvas(resume, {
    useCORS: true,
    allowTaint: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth: A4_WIDTH,
  }).then(canvas => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
    pdf.save(filename);
  });
  
  resume.firstChild.classList.add('shadow-lg')
  resume.classList.add('px-3')
  resume.classList.add('px-lg-5')
}

function printContent() {
      html2canvas(document.querySelector("#resume"), { useCORS: true, allowTaint: true }).then(canvas => {
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write('<img src="' + canvas.toDataURL() + '" style="width:100%;">');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      })
    }
</script>
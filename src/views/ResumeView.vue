<template>
<section class="w-100 d-flex">
    <button class="btn btn-danger" @click="generatePDF">BETA TEST PDF</button>
    <article class="justify-content-center m-auto">
        <ResumeComponent id="resume" :context="context" :EditMode="false"/>
    </article>
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
      html2canvas(document.querySelector("#resume"), { useCORS: true, allowTaint: true }).then(canvas => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
        pdf.save('content.pdf');
      });
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
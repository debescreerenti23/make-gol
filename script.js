// Inicialización de fecha y footer
const now = new Date();
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const monthName = months[now.getMonth()];
const yearValue = now.getFullYear();

// Esperar a que el DOM cargue para mostrar la fecha
document.addEventListener('DOMContentLoaded', () => {
    const dateDisplay = document.getElementById('current-date-display');
    const yearDisplay = document.getElementById('year');
    
    if(dateDisplay) dateDisplay.innerText = `${monthName} ${yearValue}`;
    if(yearDisplay) yearDisplay.innerText = yearValue;
});

async function generatePDF() {
    try {
        // Acceso compatible a jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const questions = [
            "1. ¿Qué es lo que realmente desea en la vida?",
            "2. ¿Por qué lo desea?",
            "3. ¿Cuándo desea lograrlo?",
            "4. ¿Cuál es el obstáculo más grande que lo detiene?",
            "5. ¿Qué información o habilidades adicionales necesita?",
            "6. ¿Quiénes son las personas cuya ayuda o cooperación necesita?"
        ];

        const answers = [
            document.getElementById('q1').value || "Sin respuesta",
            document.getElementById('q2').value || "Sin respuesta",
            document.getElementById('q3').value || "Sin respuesta",
            document.getElementById('q4').value || "Sin respuesta",
            document.getElementById('q5').value || "Sin respuesta",
            document.getElementById('q6').value || "Sin respuesta"
        ];

        // Diseño del encabezado del PDF
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(0, 150, 150); 
        doc.text("ESTABLECIMIENTO DE METAS", 20, 30);
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Fecha de registro: ${monthName} de ${yearValue}`, 20, 38);
        doc.setDrawColor(0, 150, 150);
        doc.line(20, 42, 190, 42);

        let yPos = 55;
        doc.setFontSize(10);

        for(let i = 0; i < questions.length; i++) {
            // Salto de página si el texto es muy largo
            if(yPos > 260) {
                doc.addPage();
                yPos = 30;
            }
            
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 80, 80);
            const splitQuestion = doc.splitTextToSize(questions[i], 170);
            doc.text(splitQuestion, 20, yPos);
            yPos += (splitQuestion.length * 7);

            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
            const text = answers[i];
            const splitAnswer = doc.splitTextToSize(text, 160);
            doc.text(splitAnswer, 25, yPos);
            yPos += (splitAnswer.length * 7) + 12;
        }

        // Footer del PDF
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Generado por javilindj © ${yearValue}`, 20, 285);

        // Guardar archivo
        doc.save(`Metas_${monthName}_${yearValue}.pdf`);

    } catch (error) {
        console.error("Error al crear el PDF:", error);
        alert("Hubo un problema al generar el PDF. Asegúrate de estar conectado a internet para cargar las librerías.");
    }
}
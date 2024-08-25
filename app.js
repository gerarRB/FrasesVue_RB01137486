const { createApp, ref, reactive } = Vue;

const app = createApp({
    setup() {
        const frases = ref([
            { frases: '"El único modo de hacer un gran trabajo es amar lo que haces."', autor: 'Steve Jobs' },
            { frases: '"El único límite a nuestros logros de mañana está en nuestras dudas de hoy."', autor: 'Franklin D. Roosevelt' },
            { frases: '"El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el valor para continuar."', autor: 'Winston Churchill' },
            { frases: '"El conocimiento habla, pero la sabiduría escucha."', autor: 'Jimi Hendrix' },
            { frases: '"La vida es como andar en bicicleta. Para mantener el equilibrio, debes seguir adelante."', autor: 'Albert Einstein' }
        ]);

        // Estado reactivo para controlar la visibilidad de los modal
        const isModalOpen = ref(false);
        const isDeleteModalOpen = ref(false);

        // Título del modal y datos de la frase actual en edición
        const modalTitle = ref("");
        const currentFrase = reactive({ frases: '', autor: '' });

        // Mensajes y tipo de alerta para mostrar notificaciones
        const alertMessage = ref('');
        const alertType = ref('success');

        // Índices para rastrear cuál frase se está editando o eliminando
        let editIndex = null;
        let deleteIndex = null;

        // Función para abrir el modal de creación o edición de frases
        const openModal = (mode, index = null) => {
            if (mode === 'edit') {
                // Si es edición, llena el formulario con la frase existente
                modalTitle.value = "Editar Frase";
                currentFrase.frases = frases.value[index].frases;
                currentFrase.autor = frases.value[index].autor;
                editIndex = index;
            } else {
                // Si es creación, limpia el formulario
                modalTitle.value = "Crear Nueva Frase";
                currentFrase.frases = '';
                currentFrase.autor = '';
                editIndex = null;
            }
            isModalOpen.value = true; // Muestra el modal
        };

        // Función para cerrar el modal de creación/edición
        const closeModal = () => {
            isModalOpen.value = false;
        };

        // Función para mostrar alertas en pantalla
        const showAlert = (message, type) => {
            alertMessage.value = message;
            alertType.value = type;
            setTimeout(() => {
                alertMessage.value = ''; // Oculta la alerta después de 3 segundos
            }, 3000);
        };

        // Función para guardar una frase (ya sea editada o nueva)
        const saveFrase = () => {
            if (editIndex !== null) {
                // Si es una edición, actualiza la frase existente
                frases.value[editIndex] = { ...currentFrase };
                showAlert('Frase editada con éxito', 'success');
            } else {
                // Si es una nueva frase, la añade a la lista
                frases.value.push({ ...currentFrase });
                showAlert('Frase agregada con éxito', 'success');
            }
            closeModal(); // Cierra el modal después de guardar
        };

        // Función para preparar la edición de una frase
        const editFrase = (index) => {
            openModal('edit', index);
        };

        // Función para abrir el modal de confirmación de eliminación
        const confirmDeleteFrase = (index) => {
            deleteIndex = index;
            isDeleteModalOpen.value = true;
        };

        // Función para eliminar una frase de la lista
        const deleteFrase = () => {
            if (deleteIndex !== null) {
                frases.value.splice(deleteIndex, 1);
                showAlert('Frase eliminada con éxito', 'danger');
                closeDeleteModal(); // Cierra el modal después de eliminar
            }
        };

        // Función para cerrar el modal de confirmación de eliminación
        const closeDeleteModal = () => {
            isDeleteModalOpen.value = false;
            deleteIndex = null;
        };

        // Devuelve los valores y funciones para que estén disponibles en la plantilla
        return {
            frases,
            isModalOpen,
            isDeleteModalOpen,
            modalTitle,
            currentFrase,
            alertMessage,
            alertType,
            openModal,
            closeModal,
            saveFrase,
            editFrase,
            confirmDeleteFrase,
            deleteFrase,
            closeDeleteModal
        };
    }
});

app.mount('#app');




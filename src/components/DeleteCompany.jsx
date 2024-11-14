export const DeleteCompany = ({ companyId, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleDelete = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete company');
        onDelete();
        setIsModalOpen(false);
      } catch (err) {
        console.error('Error deleting company:', err);
      }
    };
  
    return (
      <>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="delete-button"
        >
          Delete Company
        </button>
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      </>
    );
  };
import "./footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Todos os direitos reservados |
        Desenvolvido por José Victor
      </p>
    </footer>
  );
};

export default Footer;

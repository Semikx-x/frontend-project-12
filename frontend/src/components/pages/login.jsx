import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectAuth, selectStatus, selectToken } from '../slices/LoginSlice.js';
import LoginForm from '../Form/Form.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const status = useSelector(selectStatus);
  const isAuth = useSelector(selectAuth);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (isAuth === true) {
      navigate('/', { replace: true });
    }
  }, [isAuth, navigate, status, token]);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body row">
              <div className="col-12">
                <LoginForm />
              </div>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.NoAcc')}</span>
                <a href="/signup">{t('login.RegBut')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

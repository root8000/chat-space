require "rails_helper"

describe MessagesController, type: :controller do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context "ログインしている" do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it "@messageの値を確かめる" do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it "@groupの値を確かめる" do
        expect(assigns(:group)).to eq group
      end
      it "indexビューにrederするか確かめる" do
        expect(response).to render_template :index
      end
    end

    context "ログインしていない" do
      before do
        get :index, params: { group_id: group.id }
      end

      it "サインイン画面にリダイレクトするか確かめる" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context "ログインしている" do
      before do
        login user
      end

      context "メッセージが保存できた" do
        subject {
          post :create,
          params: params
        }

        it "Messageモデルのレコード合計数が一個増えたか確かめる" do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it "メッセージ一覧にリダイレクトしているか確かめる" do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context "メッセージが保存できなかった" do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }

        it "Messageモデルのレコード合計数が変化しなかったか確かめる" do
          expect{ subject }.not_to change(Message, :count)
        end

        it "indexビューへrenderするか確かめる" do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context "ログインしていない" do

      it "サインイン画面にリダイレクトしているか確かめる" do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
